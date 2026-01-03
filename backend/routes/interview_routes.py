from flask import Blueprint, request, jsonify
from backend.services.interview_service import (
    generate_interview_question,
    evaluate_answer
)

interview_bp = Blueprint("interview", __name__, url_prefix="/api")


@interview_bp.route("/generate-question", methods=["POST"])
def generate_question():
    data = request.json
    section = data.get("section")
    resume_text = data.get("resume_text", "")

    question = generate_interview_question(section, resume_text)

    return jsonify({
        "question": question
    })


@interview_bp.route("/evaluate-answer", methods=["POST"])
def evaluate():
    data = request.json
    section = data.get("section")
    answer = data.get("answer")

    evaluation = evaluate_answer(section, answer)

    return jsonify(evaluation)
