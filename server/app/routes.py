from datetime import timedelta
from flask import Blueprint,request,jsonify,session
from flask_login import login_user,logout_user,login_required,current_user
from app import bcrypt,db,server_session
from .models import User

routes = Blueprint('routes', __name__)
@routes.route('/')
def index():
    return 'hello world'

@routes.route("/@me",methods=["GET"])
def get_user():
    print(f"Session: {session}")
    user_id=session.get("user_id")
    if user_id is None:
        return jsonify({"error":"Unauthorized"}),401
    user=User.query.filter_by(id=user_id).first()
    return jsonify({"id":user.id,"email":user.email,"user_name":user.user_name}),200
@routes.route('/signup',methods=['POST'])
def signup():
    email=request.json["email"]
    password=request.json["password"]
    user_name=request.json["user_name"]
    if not email or not password or not user_name:
        return jsonify({"error": "All fields are required"}), 400
    user_exists=User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error":"User already exists"}),409
    hashed_password=bcrypt.generate_password_hash(password).decode('utf-8')

    new_user=User(email=email,password=hashed_password,user_name=user_name)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return jsonify({ "id": new_user.id,"email": new_user.email,"user_name": new_user.user_name}), 201

@routes.route('/login',methods=['POST'])
def login():
    email=request.json["email"]
    password=request.json["password"]
    user=User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error":"User does not exist"}),404
    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"error":"Password is incorrect"}),401

    session["user_id"] = user.id
    return jsonify({"id":user.id,"email":user.email}),200

@routes.route('/logout',methods=['GET'])
def logout():
    session.pop("user_id")
    return jsonify({'message':"Logout out successfully"}),200