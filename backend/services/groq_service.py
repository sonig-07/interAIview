import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def ask_groq(prompt):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # ✅ UPDATED MODEL
        messages=[
            {
                "role": "system",
                "content": "You are a professional interview assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
        max_tokens=200
    )

    return response.choices[0].message.content.strip()
