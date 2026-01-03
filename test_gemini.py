import google.generativeai as genai

API_KEY = "AIzaSyAbTemOpLVZWR3jYZ-TmYzTCly2Rt1O7f4"

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-pro")

response = model.generate_content("Say hello in one sentence")

print(response.text)
