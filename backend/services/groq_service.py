import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def ask_groq(prompt, temperature=0.6):
    """
    Sends prompt to Groq LLM (llama-3.3-70b-versatile)
    Returns plain text response
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a professional resume and interview assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=temperature,
        max_tokens=600
    )

    return response.choices[0].message.content.strip()


# import os
# from groq import Groq

# client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# def ask_groq(prompt):
#     response = client.chat.completions.create(
#         model="llama-3.3-70b-versatile",
#         messages=[
#             {"role": "system", "content": "You are a helpful AI assistant."},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.6
#     )

#     return response.choices[0].message.content.strip()
