from models import WeatherData, db
from sqlalchemy import func


def calculate_daily_stats():
    # Group by city and day, calculate min, max, avg temperature
    stats = db.session.query(
        func.date(WeatherData.timestamp).label('day'),
        WeatherData.city,
        func.min(WeatherData.temperature).label('min_temp'),
        func.max(WeatherData.temperature).label('max_temp'),
        func.avg(WeatherData.temperature).label('avg_temp')
    ).group_by('day', WeatherData.city).all()

    results = []
    for day, city, min_t, max_t, avg_t in stats:
        results.append({
            'day': day.isoformat(),
            'city': city,
            'min_temp': float(min_t),
            'max_temp': float(max_t),
            'avg_temp': round(float(avg_t), 2)
        })
    return results


def get_trend_for_city(city, days=7):
    # Get last `days` of average temperature for trend
    from datetime import datetime, timedelta
    cutoff = datetime.utcnow() - timedelta(days=days)
    records = db.session.query(WeatherData).filter(
        WeatherData.city == city,
        WeatherData.timestamp >= cutoff
    ).order_by(WeatherData.timestamp).all()

    trend = [{'timestamp': r.timestamp.isoformat(), 'temperature': r.temperature} for r in records]
    return trend