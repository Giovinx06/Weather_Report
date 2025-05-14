from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, WeatherData
from utils.fetch_weather import fetch_openweathermap
from utils.process_data import calculate_daily_stats, get_trend_for_city

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

@weather_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_daily_stats():
    stats = calculate_daily_stats()
    return jsonify(stats)

@weather_bp.route('/trend/<city>', methods=['GET'])
@jwt_required()
def get_city_trend(city):
    days = request.args.get('days', 7, type=int)
    trend = get_trend_for_city(city, days)
    return jsonify(trend)