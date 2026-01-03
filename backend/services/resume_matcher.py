from backend.utils.skills import SKILLS

def calculate_match(resume_text, job_description):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    matched = []
    missing = []

    for skill in SKILLS:
        if skill in job_description:
            if skill in resume_text:
                matched.append(skill)
            else:
                missing.append(skill)

    score = 0
    if matched or missing:
        score = int((len(matched) / (len(matched) + len(missing))) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }
