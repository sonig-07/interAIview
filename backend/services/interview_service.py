def generate_interview_question(section, resume_text):
    questions = {
        "introduction": "Tell me about yourself and your background.",
        "technical": "Explain a challenging technical problem you solved recently.",
        "behavioral": "Describe a time you faced a conflict in a team.",
        "hr": "Where do you see yourself in 3 years?",
        "gd": "What are your thoughts on AI replacing jobs?"
    }

    return questions.get(section, "Tell me about yourself.")


def evaluate_answer(section, answer):
    return {
        "feedback": "Your answer is relevant and structured well.",
        "suggestions": "Try to include a real example and quantify your impact."
    }
