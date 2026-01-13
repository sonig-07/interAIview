def evaluate_answer(question, answer, section):
    score = 0
    feedback = []
    strengths = []
    improvements = []

    words = answer.split()

    # Length check
    if len(words) >= 30:
        score += 3
        strengths.append("Answer is well explained.")
    else:
        improvements.append("Try to elaborate your answer more.")

    # Keyword relevance (basic)
    keywords = {
        "introduction": ["experience", "skills", "background"],
        "behavioral": ["pressure", "team", "challenge", "handle"],
        "technical": ["api", "database", "logic", "performance"],
        "hr": ["company", "role", "growth"],
        "gd": ["opinion", "agree", "disagree", "reason"]
    }

    section_keywords = keywords.get(section.lower(), [])
    matched = [k for k in section_keywords if k in answer.lower()]

    if matched:
        score += 4
        strengths.append("Relevant points were mentioned.")
    else:
        improvements.append("Answer could be more role-specific.")

    # Sentence structure
    if "." in answer:
        score += 2
    else:
        improvements.append("Try framing complete sentences.")

    # Tone check
    if "I" in answer or "my" in answer:
        score += 1

    return {
        "score": min(score, 10),
        "strengths": strengths,
        "improvements": improvements,
        "feedback": "Good attempt. Focus on clarity and relevance."
    }
