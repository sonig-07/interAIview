from werkzeug.security import generate_password_hash, check_password_hash
from db import users_col
from utils.jwt_helper import create_token

def signup_user(name, email, password):
    if users_col.find_one({"email": email}):
        return None

    user = {
        "name": name,
        "email": email,
        "password": generate_password_hash(password)
    }

    result = users_col.insert_one(user)

    return {
        "token": create_token(result.inserted_id),
        "user": {
            "id": str(result.inserted_id),
            "name": name,
            "email": email
        }
    }


def login_user(data):
    user = users_col.find_one({"email": data["email"]})

    if not user or not check_password_hash(user["password"], data["password"]):
        return None

    return {
        "token": create_token(user["_id"]),
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }
