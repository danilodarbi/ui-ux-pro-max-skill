from flask import Flask, request, jsonify
import uuid
from datetime import datetime

app = Flask(__name__)

users = [
    {
        "id": "empresa01",
        "allowed_numbers": [
            "+551140000000"
        ]
    }
]


def validate_caller_id(user_id, caller_id):
    user = next(
        (u for u in users if u["id"] == user_id),
        None
    )

    if not user:
        return False

    return caller_id in user["allowed_numbers"]


def audit_log(event_type, data):
    log = {
        "timestamp": str(datetime.now()),
        "event": event_type,
        "data": data
    }

    print(log)


def parse_sip(raw_message):
    headers = {}

    lines = raw_message.split("\n")

    for line in lines:
        if ":" not in line:
            continue

        key, value = line.split(":", 1)

        headers[key.strip()] = value.strip()

    return headers


@app.route("/sip/invite", methods=["POST"])
def sip_invite():
    body = request.json

    user_id = body.get("userId")
    from_number = body.get("from")
    to_number = body.get("to")

    valid = validate_caller_id(user_id, from_number)

    if not valid:
        audit_log(
            "spoofing_detected",
            {
                "from": from_number,
                "to": to_number
            }
        )

        return jsonify({
            "blocked": True,
            "reason": "caller_id_not_allowed"
        }), 403

    session_id = str(uuid.uuid4())

    audit_log(
        "call_created",
        {
            "session_id": session_id,
            "from": from_number,
            "to": to_number
        }
    )

    return jsonify({
        "accepted": True,
        "session_id": session_id
    })


if __name__ == "__main__":
    print("SIP backend running")

    app.run(
        host="0.0.0.0",
        port=3000,
        debug=True
    )
