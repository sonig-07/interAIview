from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from backend.routes.resume_routes import resume_bp
    from backend.routes.interview_routes import interview_bp
    from backend.routes.answer_routes import answer_bp

    app.register_blueprint(resume_bp, url_prefix="/api/resume")
    app.register_blueprint(interview_bp, url_prefix="/api/interview")
    app.register_blueprint(answer_bp, url_prefix="/api/answer")

    return app
