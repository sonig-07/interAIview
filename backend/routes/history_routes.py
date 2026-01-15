# from flask import Blueprint, jsonify, request
# from utils.jwt_helper import token_required
# from db import resume_col, interview_col

# history_bp = Blueprint("history", __name__, url_prefix="/api/history")

# @history_bp.route("/resume", methods=["GET"])
# @token_required
# def resume_history():
#     data = list(
#         resume_col.find({"user_id": request.user_id}, {"_id": 0})
#     )
#     return jsonify(data)

# @history_bp.route("/interview", methods=["GET"])
# @token_required
# def interview_history():
#     data = list(
#         interview_col.find({"user_id": request.user_id}, {"_id": 0})
#     )
#     return jsonify(data)


from flask import Blueprint, jsonify, request
from utils.jwt_helper import token_required
from db import resume_col, interview_col

history_bp = Blueprint("history", __name__, url_prefix="/api/history")


@history_bp.route("/resume", methods=["GET"])
@token_required
def resume_history():
    data = list(
        resume_col.find(
            {"user_id": request.user_id},
            {"_id": 0}
        )
    )
    return jsonify(data)


@history_bp.route("/interview", methods=["GET"])
@token_required
def interview_history():
    data = list(
        interview_col.find(
            {"user_id": request.user_id},
            {"_id": 0}
        )
    )
    return jsonify(data)
