from flask import Blueprint, request, jsonify
from services.resume_parser import extract_text_from_resume
from services.skill_matcher import match_resume_with_jd
from services.resume_ai_feedback import get_resume_feedback

resume_bp = Blueprint("resume", __name__, url_prefix="/api")

@resume_bp.route("/analyze-resume", methods=["POST"])
def analyze_resume():
    resume_file = request.files.get("resume")
    jd_text = request.form.get("job_description", "")

    resume_text = extract_text_from_resume(resume_file)

    match_result = match_resume_with_jd(resume_text, jd_text)

    ai_feedback = get_resume_feedback(
        resume_text,
        jd_text,
        match_result["match_score"],
        match_result["missing_skills"]
    )

    return jsonify({
        "match_score": match_result["match_score"],
        "matched_skills": match_result["matched_skills"],
        "missing_skills": match_result["missing_skills"],
        "ai_feedback": ai_feedback
    })
