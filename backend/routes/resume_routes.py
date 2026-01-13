from flask import Blueprint, request, jsonify

from services.resume_parser import extract_text_from_resume
from services.skill_matcher import match_resume_with_jd

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

    
    # 5️⃣ Final response
    return jsonify({
        "status": "success",
        "match_score": match_result["match_score"],
        "matched_skills": match_result["matched_skills"],
        "missing_skills": match_result["missing_skills"],
    
    })
