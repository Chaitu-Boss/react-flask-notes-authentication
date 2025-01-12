from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(10000))
    desc=db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self)->str:
        return f"{self.id}-{self.title} by {self.user_id}"


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    user_name = db.Column(db.String(150))
    password = db.Column(db.String(150))
    notes = db.relationship('Note')

    def __repr__(self)->str:
        return f"{self.user_name}-{self.email}"