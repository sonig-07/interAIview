import jwt
import os
from functools import wraps
from flask import request, jsonify

# SECRET KEY
SECRET = os.getenv("JWT_SECRET", "supersecret")

# =========================
# CREATE JWT TOKEN
# =========================
def create_token(user_id, name=None, email=None):
    payload = {
        "user_id": str(user_id),
        "name": name,
        "email": email
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")


# =========================
# TOKEN PROTECTOR DECORATOR
# =========================
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"error": "Token missing"}), 401

        try:
            token = auth_header.split(" ")[1]  # Bearer <token>
            data = jwt.decode(token, SECRET, algorithms=["HS256"])

            # Attach user info to request (IMPORTANT 🔥)
            request.user_id = data.get("user_id")
            request.user_name = data.get("name")
            request.user_email = data.get("email")

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Session expired, login again"}), 401
        except Exception:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated
