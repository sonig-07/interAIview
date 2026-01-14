from services.groq_service import ask_groq

def get_resume_feedback(resume_text, jd_text, score, missing_skills):
    prompt = f"""
You are a professional resume reviewer.

Resume text:
{resume_text[:3000]}

Job description:
{jd_text[:2000]}

Match score: {score}%
Missing skills: {", ".join(missing_skills)}

Give short, actionable feedback in 4–5 bullet points.
Focus on improvements and ATS optimization.
"""

    return ask_groq(prompt)
