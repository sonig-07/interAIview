from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.resume_routes import resume_bp
from routes.interview_routes import interview_bp
from routes.history_routes import history_bp



app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(resume_bp, url_prefix="/api")
app.register_blueprint(interview_bp, url_prefix="/api/interview")
app.register_blueprint(history_bp)

if __name__ == "__main__":
    app.run(debug=True)


# from flask import Flask, jsonify
# from flask_cors import CORS

# from routes.resume_routes import resume_bp
# from routes.interview_routes import interview_bp
# from routes.auth_routes import auth_bp




# app = Flask(__name__)

# # ✅ GLOBAL CORS FIX (THIS IS THE KEY)
# CORS(
#     app,
#     resources={r"/api/*": {"origins": "http://localhost:3000"}},
#     supports_credentials=True
# )

# # Register blueprints
# app.register_blueprint(resume_bp)
# app.register_blueprint(interview_bp)
# app.register_blueprint(auth_bp)

# @app.route("/")
# def home():
#     return jsonify({"status": "InterAIview backend running"})


# if __name__ == "__main__":
#     app.run(debug=True)
