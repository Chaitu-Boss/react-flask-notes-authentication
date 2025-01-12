from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from flask_login import LoginManager
from os import path

from config import AppConfig
db = SQLAlchemy()
bcrypt= Bcrypt()
server_session = Session()
cors=CORS(origins="http://localhost:5173",supports_credentials=True)
def create_app():
    app=Flask(__name__)
    app.config.from_object(AppConfig)
    db.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    server_session.init_app(app)
    from .models import User, Note
    from .routes import routes
    app.register_blueprint(routes)
    return app

def create_database(app):
    db_path = path.join('instance/', 'database.db')
    if not path.exists(db_path):
        with app.app_context():
            db.create_all()
        print('Created Database!')