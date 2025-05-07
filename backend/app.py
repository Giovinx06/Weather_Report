from flask import Flask
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint
from config import Config
from models import db
from auth import auth_bp
from routes.weather import weather_bp
from routes.users import users_bp

app = Flask(__name__)
app.config.from_object(Config)

# init
db.init_app(app)
jwt = JWTManager(app)

# register
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(weather_bp, url_prefix='/api/weather')

### Swagger
SWAGGER_URL = '/docs'
API_URL = '/static/swagger.json'
swaggerui_bp = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swaggerui_bp, url_prefix=SWAGGER_URL)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)