from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, User

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
@jwt_required()
def list_users():
    users = User.query.all()
    return jsonify([u.username for u in users])

@users_bp.route('/<int:uid>', methods=['DELETE'])
@jwt_required()
def delete_user(uid):
    user = User.query.get_or_404(uid)
    db.session.delete(user)
    db.session.commit()
    return jsonify(msg="Deleted"), 200

@users_bp.route('/<int:uid>', methods=['PUT'])
@jwt_required()
def change_password(uid):
    data = request.get_json()
    user = User.query.get_or_404(uid)
    user.password_hash = generate_password_hash(data['password'])
    db.session.commit()
    return jsonify(msg="Password updated"), 200