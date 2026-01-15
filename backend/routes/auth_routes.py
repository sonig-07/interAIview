from flask import Blueprint, request, jsonify
from services.auth_service import signup_user, login_user

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# =========================
# Signup
# =========================
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    result = signup_user(data["name"], data["email"], data["password"])

    if not result:
        return jsonify({"error": "User already exists"}), 400

    return jsonify(result)


# =========================
# Login
# =========================
@auth_bp.route("/login", methods=["POST"])
def login():
    result = login_user(data := request.json)

    if not result:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify(result)




# from flask import Blueprint, request, jsonify
# from services.auth_service import signup_user, login_user

# auth_bp = Blueprint("auth", __name__)

# @auth_bp.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     token = signup_user(data["name"], data["email"], data["password"])

#     if not token:
#         return jsonify({"error": "User already exists"}), 400

#     return jsonify({"token": token})


# @auth_bp.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     token = login_user(data["email"], data["password"])

#     if not token:
#         return jsonify({"error": "Invalid credentials"}), 401

#     return jsonify ({"token": token,
#     "user": {
#         "id": str(user["_id"]),
#         "name": user["name"],
#         "email": user["email"]
#     }
# })
    
