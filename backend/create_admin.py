from werkzeug.security import generate_password_hash
from flask import Flask
from models import db, User
from config import Config
import sys

def create_admin_user(username="admin", password="admin123"):
    """
    Creates an admin user with the given credentials if it doesn't exist
    """
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    
    with app.app_context():
        # Ensure tables exist
        db.create_all()
        
        # Check if admin user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            print(f"User '{username}' already exists.")
            # Update admin status if needed
            if not existing_user.is_admin:
                existing_user.is_admin = True
                db.session.commit()
                print(f"User '{username}' updated to admin status.")
            return
        
        # Create new admin user
        hashed_password = generate_password_hash(password)
        admin = User(
            username=username,
            password_hash=hashed_password,
            is_admin=True
        )
        db.session.add(admin)
        db.session.commit()
        print(f"Admin user '{username}' created successfully!")

if __name__ == "__main__":
    # Get command line arguments
    username = "admin"
    password = "admin123"
    
    if len(sys.argv) > 1:
        username = sys.argv[1]
    if len(sys.argv) > 2:
        password = sys.argv[2]
        
    create_admin_user(username, password)
    # To create with custom credentials, use:
    # create_admin_user("your_admin", "your_password") 