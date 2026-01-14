# from flask import Flask, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv

# # Load environment variables (.env)
# load_dotenv()

# # Import blueprints
# from routes.resume_routes import resume_bp
# from routes.interview_routes import interview_bp

# # Create Flask app
# app = Flask(__name__)

# # ✅ ENABLE CORS FOR FRONTEND
# CORS(
#     app,
#     resources={r"/api/*": {"origins": "http://localhost:3000"}},
#     supports_credentials=True
# )

# # Register blueprints
# app.register_blueprint(resume_bp)
# app.register_blueprint(interview_bp)

# # Health check
# @app.route("/")
# def home():
#     return jsonify({"status": "InterAIview backend running 🚀"})

# # Run server
# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=5000, debug=True)



from flask import Flask
from flask_cors import CORS

from routes.resume_routes import resume_bp
from routes.interview_routes import interview_bp

app = Flask(__name__)

# ✅ GLOBAL CORS FIX (THIS IS THE KEY)
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True
)

# Register blueprints
app.register_blueprint(resume_bp)
app.register_blueprint(interview_bp)

if __name__ == "__main__":
    app.run(debug=True)
