def get_ai_resume_feedback(resume_text, jd_text, match_score, missing_skills):
    return (
        "Your resume aligns well with the job description. "
        "However, you should consider improving or adding experience in: "
        f"{', '.join(missing_skills)}. "
        "Try to quantify achievements and tailor keywords more closely to the JD."
    )
