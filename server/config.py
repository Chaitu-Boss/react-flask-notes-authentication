from dotenv import load_dotenv
from datetime import timedelta
from redis import Redis

load_dotenv()
import os
class AppConfig:
    SECRET_KEY=os.environ['SECRET_KEY']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    DEBUG = True
    port=5000
    SESSION_TYPE="redis"
    SESSION_PERMANENT=False
    SESSION_USE_SIGNER=True
    SESSION_REDIS=Redis.from_url("redis://127.0.0.1:6379")
    REMEMBER_COOKIE_DURATION = timedelta(minutes=20)