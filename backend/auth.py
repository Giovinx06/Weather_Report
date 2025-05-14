from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User
import re

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validazione
    if not data or not data.get('username') or not data.get('password'):
        return jsonify(msg="Username e password richiesti"), 400
    
    # Verifica username già esistente
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify(msg="Username già in uso"), 409
    
    # Validazione username (solo lettere, numeri e underscore)
    if not re.match(r'^[a-zA-Z0-9_]+$', data['username']):
        return jsonify(msg="Username può contenere solo lettere, numeri e underscore"), 400
    
    # Validazione lunghezza password
    if len(data['password']) < 6:
        return jsonify(msg="La password deve contenere almeno 6 caratteri"), 400
    
    try:
        hashed = generate_password_hash(data['password'])
        user = User(username=data['username'], password_hash=hashed)
        db.session.add(user)
        db.session.commit()
        return jsonify(msg="Utente creato con successo"), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(msg="Errore durante la registrazione"), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validazione
    if not data or not data.get('username') or not data.get('password'):
        return jsonify(msg="Username e password richiesti"), 400
    
    try:
        user = User.query.filter_by(username=data['username']).first()
        if not user or not check_password_hash(user.password_hash, data['password']):
            return jsonify(msg="Credenziali non valide"), 401
        
        token = create_access_token(identity=user.id)
        return jsonify(
            access_token=token, 
            is_admin=user.is_admin, 
            username=user.username
        )
    except Exception as e:
        return jsonify(msg="Errore di autenticazione"), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify(msg="Utente non trovato"), 404
            
        return jsonify(
            id=user.id,
            username=user.username,
            is_admin=user.is_admin,
            created_at=user.created_at.isoformat()
        )
    except Exception as e:
        return jsonify(msg="Errore nel recupero delle informazioni utente"), 500