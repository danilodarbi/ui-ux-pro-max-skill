from flask import Flask, request, jsonify, render_template
import sip_client
from config import WEB_PORT

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/status")
def status():
    return jsonify({
        "registered": sip_client.is_registered(),
        "calls": sip_client.get_calls(),
        "logs": sip_client.get_logs()[-50:],
    })


@app.route("/call", methods=["POST"])
def call():
    data = request.json
    number = data.get("number", "").strip()
    if not number:
        return jsonify({"error": "Número obrigatório"}), 400
    session_id = sip_client.make_call(number)
    return jsonify({"session_id": session_id})


@app.route("/hangup", methods=["POST"])
def hangup():
    data = request.json
    session_id = data.get("session_id", "").strip()
    ok = sip_client.hangup(session_id)
    return jsonify({"ok": ok})


if __name__ == "__main__":
    sip_client.start()
    print(f"\nAcesse: http://localhost:{WEB_PORT}\n")
    app.run(host="0.0.0.0", port=WEB_PORT, debug=False)
