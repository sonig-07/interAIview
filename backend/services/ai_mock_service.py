def generate_text(prompt: str) -> str:
    if "interview" in prompt.lower():
        return (
            "1. Can you explain your experience with Python?\n"
            "2. What is Flask and how does it work?\n"
            "3. How do you handle errors in backend applications?\n"
            "4. Explain REST APIs.\n"
            "5. How do you structure a project?"
        )

    return (
        "Strengths: Strong backend fundamentals.\n"
        "Weaknesses: Limited cloud exposure.\n"
        "Suggestions: Build small projects using APIs and backend frameworks."
    )
