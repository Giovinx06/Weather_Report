import requests
from datetime import datetime

def fetch_openweathermap(api_key, city):
    res = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    )
    data = res.json()
    return {
        'city': city,
        'timestamp': datetime.utcnow(),
        'temperature': data['main']['temp'],
        'humidity': data['main']['humidity'],
        'pressure': data['main']['pressure'],
    }