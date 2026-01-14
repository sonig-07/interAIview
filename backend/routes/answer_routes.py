from flask import Blueprint, request, jsonify
from services.ai_mock_service import generate_text

answer_bp = Blueprint("answer", __name__)


@answer_bp.route("/evaluate-answer", methods=["POST"])
def evaluate_answer():
    data = request.json

    question = data.get("question")
    answer = data.get("answer")

    if not question or not answer:
        return jsonify({"error": "Question and answer required"}), 400

    prompt = f"""
    Interview Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate the answer and provide:
    - Feedback
    - What was good
    - What can be improved
    """

    evaluation = generate_text(prompt)

    return jsonify({
        "evaluation": evaluation
    })


