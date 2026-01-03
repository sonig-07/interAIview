import re


def extract_skills(text):
    skills = [
        "python", "java", "react", "flask", "spring",
        "sql", "mongodb", "javascript", "html", "css",
        "git", "api", "rest", "docker", "aws"
    ]

    text = text.lower()
    found = set()

    for skill in skills:
        if re.search(rf"\b{skill}\b", text):
            found.add(skill)

    return found


def match_resume_with_jd(resume_text, jd_text):
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    matched = resume_skills & jd_skills
    missing = jd_skills - resume_skills

    score = 0
    if jd_skills:
        score = int((len(matched) / len(jd_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": list(matched),
        "missing_skills": list(missing)
    }
