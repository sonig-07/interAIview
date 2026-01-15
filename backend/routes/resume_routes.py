from flask import Blueprint, request, jsonify
from services.resume_parser import extract_text_from_resume
from services.skill_matcher import match_resume_with_jd
from services.resume_ai_feedback import get_resume_feedback
from utils.jwt_helper import token_required
from db import resume_col

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/analyze-resume", methods=["POST"])
@token_required
def analyze_resume():
    resume_file = request.files.get("resume")
    jd_text = request.form.get("job_description", "")

    if not resume_file or not jd_text:
        return jsonify({"error": "Resume or Job Description missing"}), 400

    # 1️⃣ Extract resume text
    resume_text = extract_text_from_resume(resume_file)

    # 2️⃣ Skill matching
    match_result = match_resume_with_jd(resume_text, jd_text)

    # 3️⃣ AI feedback
    ai_feedback = get_resume_feedback(
        resume_text,
        jd_text,
        match_result["match_score"],
        match_result["missing_skills"]
    )

    # 4️⃣ Save history (THIS ENABLES HISTORY FEATURE)
    resume_col.insert_one({
        "user_id": str(request.user_id),
        "resume_text": resume_text,
        "job_desc": jd_text,
        "match_score": match_result["match_score"],
        "matched_skills": match_result["matched_skills"],
        "missing_skills": match_result["missing_skills"],
        "ai_feedback": ai_feedback
    })

    # 5️⃣ Return to frontend
    return jsonify({
        "match_score": match_result["match_score"],
        "matched_skills": match_result["matched_skills"],
        "missing_skills": match_result["missing_skills"],
        "ai_feedback": ai_feedback
    })
