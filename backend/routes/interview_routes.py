from flask import Blueprint, request, jsonify
from services.groq_service import ask_groq
from services.interview_evaluator import evaluate_answer
from db import interview_col
from utils.jwt_helper import token_required

interview_bp = Blueprint("interview", __name__, url_prefix="/api/interview")

# =========================
# Generate Question
# =========================
@interview_bp.route("/question", methods=["POST"])
def generate_question():
    data = request.get_json()
    section = data.get("section", "technical")

    prompt = f"Ask one {section} interview question. Difficulty: easy."
    question = ask_groq(prompt)

    return jsonify({"question": question})


# =========================
# Evaluate Answer (AI)
# =========================
@interview_bp.route("/evaluate", methods=["POST"])
def evaluate_interview_answer():
    data = request.json

    question = data.get("question", "")
    answer = data.get("answer", "")
    section = data.get("section", "general")

    feedback = evaluate_answer(question, answer, section)

    return jsonify({"feedback": feedback})


# =========================
# Save Answer + Feedback (JWT)
# =========================
@interview_bp.route("/answer", methods=["POST"])
@token_required
def submit_answer():
    data = request.json

    interview_col.insert_one({
        "user_id": str(request.user_id),
        "question": data.get("question"),
        "answer": data.get("answer"),
        "feedback": data.get("feedback"),
        "section": data.get("section")
    })

    return jsonify({"success": True})



# from flask import Blueprint, request, jsonify
# from services.groq_service import ask_groq
# from services.interview_evaluator import evaluate_answer
# from db import interview_col
# from utils.jwt_helper import token_required

# interview_bp = Blueprint("interview", __name__, url_prefix="/api/interview")


# # ----------------------------
# # Generate Interview Question
# # ----------------------------
# @interview_bp.route("/question", methods=["POST"])
# def generate_question():
#     data = request.get_json()
#     section = data.get("section", "technical")

#     prompt = f"Ask one {section} interview question. Difficulty: easy."

#     question = ask_groq(prompt)

#     return jsonify({"question": question})


# # ----------------------------
# # Evaluate Answer (AI feedback)
# # ----------------------------
# @interview_bp.route("/evaluate", methods=["POST"])
# def evaluate_interview_answer():
#     data = request.get_json()

#     question = data.get("question", "")
#     answer = data.get("answer", "")
#     section = data.get("section", "general")

#     feedback = evaluate_answer(question, answer, section)

#     return jsonify({
#         "feedback": feedback
#     })


# # ----------------------------
# # Save Answer + History (AUTH)
# # ----------------------------
# @interview_bp.route("/answer", methods=["POST"])
# @token_required
# def submit_answer():
#     data = request.get_json()

#     interview_col.insert_one({
#         "user_id": request.user_id,
#         "question": data.get("question"),
#         "answer": data.get("answer"),
#         "feedback": data.get("feedback"),
#         "section": data.get("section")
#     })

#     return jsonify({"success": True})
