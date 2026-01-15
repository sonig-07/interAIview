from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("❌ MONGO_URI not found")

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["interaiview"]


users_col = db["users"]
resume_col = db["resume_analysis"]
interview_col = db["interviews"]

print("✅ MongoDB Atlas connected")

