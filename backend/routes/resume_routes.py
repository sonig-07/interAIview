from flask import Blueprint, request, jsonify

from backend.services.resume_parser import extract_text_from_resume
from backend.services.skill_matcher import match_resume_with_jd
from backend.services.ai_resume_feedback import get_ai_resume_feedback

resume_bp = Blueprint("resume", __name__, url_prefix="/api")


@resume_bp.route("/analyze-resume", methods=["POST"])
def analyze_resume():
    # 1️⃣ Check resume file
    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    resume_file = request.files["resume"]
    jd_text = request.form.get("job_description", "")

    # 2️⃣ Extract resume text
    resume_text = extract_text_from_resume(resume_file)

    # 3️⃣ Skill matching logic
    match_result = match_resume_with_jd(resume_text, jd_text)

    # 4️⃣ AI resume feedback (TEXT ONLY)
    ai_feedback = get_ai_resume_feedback(
        resume_text=resume_text,
        jd_text=jd_text,
        match_score=match_result["match_score"],
        missing_skills=match_result["missing_skills"]
    )

    # 5️⃣ Final response
    return jsonify({
        "status": "success",
        "match_score": match_result["match_score"],
        "matched_skills": match_result["matched_skills"],
        "missing_skills": match_result["missing_skills"],
        "ai_feedback": ai_feedback
    })
