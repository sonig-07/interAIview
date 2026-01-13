# from flask import Blueprint, request, jsonify
# from services.resume_parser import extract_text_from_resume


# interview_bp = Blueprint("interview", __name__, url_prefix="/api/interview")

# @interview_bp.route("/question", methods=["POST"])
# def get_question():
#     data = request.get_json()
#     section = data.get("section", "introduction")

#     QUESTIONS = {
#         "introduction": "Tell me about yourself.",
#         "technical": "Explain REST APIs.",
#         "behavioral": "How do you handle pressure?",
#         "hr": "Why should we hire you?",
#         "gd": "Discuss the impact of AI on jobs."
#     }

#     return jsonify({
#         "question": QUESTIONS.get(section, "Tell me about yourself.")
#     })


from flask import Blueprint, request, jsonify

interview_bp = Blueprint("interview", __name__, url_prefix="/api/interview")

@interview_bp.route("/question", methods=["POST"])
def get_question():
    data = request.get_json()
    section = data.get("section")

    questions = {
        "introduction": "Tell me about yourself.",
        "technical": "Explain React hooks.",
        "behavioral": "Describe a challenge you faced.",
        "hr": "Why should we hire you?",
        "gd": "What is your opinion on AI replacing jobs?"
    }

    return jsonify({
        "question": questions.get(section, "No question found")
    })

@interview_bp.route("/answer", methods=["POST"])
def submit_answer():
    data = request.get_json()
    answer = data.get("answer")

    return jsonify({
        "status": "received",
        "answer": answer
    })
