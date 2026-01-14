from flask import Blueprint, request, jsonify
from services.groq_service import ask_groq

interview_bp = Blueprint("interview", __name__, url_prefix="/api/interview")


@interview_bp.route("/question", methods=["POST"])
def generate_question():
    data = request.get_json()
    section = data.get("section", "technical")

    prompt = f"Ask one {section} interview question. Difficulty: easy."

    question = ask_groq(prompt)

    return jsonify({"question": question})


@interview_bp.route("/answer", methods=["POST"])
def submit_answer():
    data = request.get_json()
    answer = data.get("answer", "")

    return jsonify({
        "status": "received",
        "answer": answer
    })
