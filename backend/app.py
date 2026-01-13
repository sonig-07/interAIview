from flask import Flask, jsonify
from flask_cors import CORS

from routes.resume_routes import resume_bp
from routes.interview_routes import interview_bp

app = Flask(__name__)

# ✅ ENABLE CORS FOR FRONTEND
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True
)

# Register routes
app.register_blueprint(resume_bp)
app.register_blueprint(interview_bp)

@app.route("/")
def home():
    return jsonify({"status": "InterAIview backend running"})

if __name__ == "__main__":
    app.run(debug=True)
