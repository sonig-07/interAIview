from flask import Flask
from flask_cors import CORS

from backend.routes.resume_routes import resume_bp
from backend.routes.interview_routes import interview_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(resume_bp)
    app.register_blueprint(interview_bp)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
