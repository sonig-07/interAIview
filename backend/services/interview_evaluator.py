from services.groq_service import ask_groq

def evaluate_answer(question, answer, section):
    prompt = f"""
You are an expert interview evaluator.

Interview Section: {section}
Question: {question}
Candidate Answer: {answer}

Evaluate the answer strictly.

Return output in this exact format:

Score: X/10
Strengths:
- ...
- ...

Weaknesses:
- ...
- ...

Suggestions:
- ...
"""

    return ask_groq(prompt)
