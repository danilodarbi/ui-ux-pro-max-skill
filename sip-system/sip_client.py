import socket
import hashlib
import threading
import time
import uuid
import re
from datetime import datetime
from config import SIP_USER, SIP_PASSWORD, SIP_DOMAIN, SIP_PORT, SIP_NUMBER, LOCAL_PORT

LOCAL_IP = "0.0.0.0"
_log_buffer = []
_active_calls = {}
_registered = False
_sock = None
_cseq = 1
_call_id_map = {}


def log(msg):
    entry = f"[{datetime.now().strftime('%H:%M:%S')}] {msg}"
    print(entry)
    _log_buffer.append(entry)
    if len(_log_buffer) > 200:
        _log_buffer.pop(0)


def get_logs():
    return list(_log_buffer)


def get_calls():
    return dict(_active_calls)


def is_registered():
    return _registered


def _md5(s):
    return hashlib.md5(s.encode()).hexdigest()


def _digest_auth(method, uri, realm, nonce):
    ha1 = _md5(f"{SIP_USER}:{realm}:{SIP_PASSWORD}")
    ha2 = _md5(f"{method}:{uri}")
    response = _md5(f"{ha1}:{nonce}:{ha2}")
    return (
        f'Digest username="{SIP_USER}", realm="{realm}", '
        f'nonce="{nonce}", uri="{uri}", response="{response}"'
    )


def _parse_headers(raw):
    headers = {}
    lines = raw.split("\r\n")
    for line in lines[1:]:
        if ": " in line:
            k, v = line.split(": ", 1)
            headers[k.strip().lower()] = v.strip()
    return headers


def _extract(pattern, text, default=""):
    m = re.search(pattern, text)
    return m.group(1) if m else default


def _send(msg):
    global _sock
    try:
        _sock.sendto(msg.encode(), (SIP_DOMAIN, SIP_PORT))
    except Exception as e:
        log(f"Erro ao enviar: {e}")


def _build_register(auth_header=None):
    global _cseq
    _cseq += 1
    call_id = str(uuid.uuid4())
    branch = "z9hG4bK" + uuid.uuid4().hex[:8]
    tag = uuid.uuid4().hex[:8]
    lines = [
        f"REGISTER sip:{SIP_DOMAIN} SIP/2.0",
        f"Via: SIP/2.0/UDP {LOCAL_IP}:{LOCAL_PORT};branch={branch}",
        f"From: <sip:{SIP_USER}@{SIP_DOMAIN}>;tag={tag}",
        f"To: <sip:{SIP_USER}@{SIP_DOMAIN}>",
        f"Call-ID: {call_id}",
        f"CSeq: {_cseq} REGISTER",
        f"Contact: <sip:{SIP_USER}@{LOCAL_IP}:{LOCAL_PORT}>",
        "Max-Forwards: 70",
        "Expires: 3600",
        "Content-Length: 0",
    ]
    if auth_header:
        lines.insert(-1, f"Authorization: {auth_header}")
    return "\r\n".join(lines) + "\r\n\r\n"


def _build_invite(to_number, session_id):
    global _cseq
    _cseq += 1
    branch = "z9hG4bK" + uuid.uuid4().hex[:8]
    tag = uuid.uuid4().hex[:8]
    call_id = session_id
    sdp = (
        "v=0\r\n"
        f"o={SIP_USER} 0 0 IN IP4 {LOCAL_IP}\r\n"
        "s=Call\r\n"
        f"c=IN IP4 {LOCAL_IP}\r\n"
        "t=0 0\r\n"
        "m=audio 8000 RTP/AVP 0\r\n"
        "a=rtpmap:0 PCMU/8000\r\n"
    )
    lines = [
        f"INVITE sip:{to_number}@{SIP_DOMAIN} SIP/2.0",
        f"Via: SIP/2.0/UDP {LOCAL_IP}:{LOCAL_PORT};branch={branch}",
        f"From: <sip:{SIP_NUMBER}@{SIP_DOMAIN}>;tag={tag}",
        f"To: <sip:{to_number}@{SIP_DOMAIN}>",
        f"Call-ID: {call_id}",
        f"CSeq: {_cseq} INVITE",
        f"Contact: <sip:{SIP_USER}@{LOCAL_IP}:{LOCAL_PORT}>",
        "Max-Forwards: 70",
        "Content-Type: application/sdp",
        f"Content-Length: {len(sdp)}",
        "",
        sdp,
    ]
    return "\r\n".join(lines)


def _build_bye(call_id, to_uri, from_tag, to_tag):
    global _cseq
    _cseq += 1
    branch = "z9hG4bK" + uuid.uuid4().hex[:8]
    tag = uuid.uuid4().hex[:8]
    lines = [
        f"BYE {to_uri} SIP/2.0",
        f"Via: SIP/2.0/UDP {LOCAL_IP}:{LOCAL_PORT};branch={branch}",
        f"From: <sip:{SIP_NUMBER}@{SIP_DOMAIN}>;tag={from_tag}",
        f"To: <sip:{to_uri}>;tag={to_tag}",
        f"Call-ID: {call_id}",
        f"CSeq: {_cseq} BYE",
        "Max-Forwards: 70",
        "Content-Length: 0",
        "",
        "",
    ]
    return "\r\n".join(lines)


def register():
    log("Enviando REGISTER...")
    _send(_build_register())


def make_call(to_number):
    session_id = str(uuid.uuid4())
    _active_calls[session_id] = {
        "to": to_number,
        "status": "calling",
        "started": str(datetime.now()),
    }
    log(f"Iniciando chamada para {to_number} | sessão {session_id}")
    _send(_build_invite(to_number, session_id))
    return session_id


def hangup(session_id):
    call = _active_calls.get(session_id)
    if not call:
        return False
    meta = _call_id_map.get(session_id, {})
    bye = _build_bye(
        session_id,
        f"sip:{call['to']}@{SIP_DOMAIN}",
        meta.get("from_tag", "tag"),
        meta.get("to_tag", ""),
    )
    _send(bye)
    _active_calls[session_id]["status"] = "ended"
    log(f"BYE enviado para sessão {session_id}")
    return True


def _handle_message(data):
    global _registered
    text = data.decode(errors="ignore")
    first_line = text.split("\r\n")[0]

    if "SIP/2.0 401" in first_line or "SIP/2.0 407" in first_line:
        headers = _parse_headers(text)
        auth_raw = headers.get("www-authenticate") or headers.get("proxy-authenticate", "")
        realm = _extract(r'realm="([^"]+)"', auth_raw)
        nonce = _extract(r'nonce="([^"]+)"', auth_raw)
        method = "REGISTER" if "REGISTER" in text or _extract(r"CSeq: \d+ (\w+)", text) == "REGISTER" else "INVITE"
        uri = f"sip:{SIP_DOMAIN}"
        auth = _digest_auth(method, uri, realm, nonce)
        log(f"Autenticando com realm={realm}")
        if method == "REGISTER":
            _send(_build_register(auth))
        return

    if "SIP/2.0 200 OK" in first_line:
        cseq_val = _extract(r"CSeq: \d+ (\w+)", text)
        if cseq_val == "REGISTER":
            _registered = True
            log("Registrado com sucesso no servidor SIP!")
        elif cseq_val == "INVITE":
            call_id = _extract(r"Call-ID: ([^\r\n]+)", text)
            to_tag = _extract(r'To:.*?tag=([^\s;>\r\n]+)', text)
            from_tag = _extract(r'From:.*?tag=([^\s;>\r\n]+)', text)
            if call_id and call_id in _active_calls:
                _active_calls[call_id]["status"] = "connected"
                _call_id_map[call_id] = {"from_tag": from_tag, "to_tag": to_tag}
                log(f"Chamada conectada! sessão {call_id}")
        return

    if "SIP/2.0 180" in first_line:
        call_id = _extract(r"Call-ID: ([^\r\n]+)", text)
        if call_id in _active_calls:
            _active_calls[call_id]["status"] = "ringing"
            log(f"Chamando... (180 Ringing) sessão {call_id}")
        return

    if "SIP/2.0 486" in first_line or "SIP/2.0 603" in first_line:
        call_id = _extract(r"Call-ID: ([^\r\n]+)", text)
        if call_id in _active_calls:
            _active_calls[call_id]["status"] = "busy/declined"
            log(f"Ocupado ou recusado. sessão {call_id}")
        return

    if first_line.startswith("INVITE"):
        call_id = _extract(r"Call-ID: ([^\r\n]+)", text)
        from_uri = _extract(r"From: ([^\r\n]+)", text)
        log(f"Chamada recebida de {from_uri} | Call-ID {call_id}")
        _active_calls[call_id] = {
            "to": from_uri,
            "status": "incoming",
            "started": str(datetime.now()),
        }
        return

    log(f"Mensagem recebida: {first_line}")


def _listener():
    global _sock
    _sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    _sock.bind((LOCAL_IP, LOCAL_PORT))
    _sock.settimeout(1.0)
    log(f"Escutando SIP na porta {LOCAL_PORT}")
    register()
    while True:
        try:
            data, _ = _sock.recvfrom(4096)
            _handle_message(data)
        except socket.timeout:
            continue
        except Exception as e:
            log(f"Erro listener: {e}")
            break


def start():
    t = threading.Thread(target=_listener, daemon=True)
    t.start()
