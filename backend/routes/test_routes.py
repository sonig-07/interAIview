from flask import Blueprint, jsonify
from backend.services.openai_service import generate_text

test_bp = Blueprint("test", __name__, url_prefix="/api/test")

@test_bp.route("/ai", methods=["GET"])
def test_ai():
    reply = generate_text("Ask me a basic Java interview question.")
    return jsonify({"reply": reply})
