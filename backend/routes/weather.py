from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, WeatherData
from utils.fetch_weather import fetch_openweathermap

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/refresh', methods=['POST'])
@jwt_required()
def refresh():
    api_key = request.json.get('api_key')
    cities = request.json.get('cities', [])
    records = []
    for city in cities:
        rec = fetch_openweathermap(api_key, city)
        wd = WeatherData(**rec)
        db.session.add(wd)
        records.append(rec)
    db.session.commit()
    return jsonify(records)

@weather_bp.route('/', methods=['GET'])
@jwt_required()
def list_data():
    data = WeatherData.query.order_by(WeatherData.timestamp.desc()).limit(100).all()
    return jsonify([{
        'city': d.city,
        'timestamp': d.timestamp.isoformat(),
        'temperature': d.temperature,
        'humidity': d.humidity,
        'pressure': d.pressure
    } for d in data])