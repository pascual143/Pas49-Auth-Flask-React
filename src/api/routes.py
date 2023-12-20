"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required
from flask_jwt_extended import set_access_cookies, unset_jwt_cookies
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != 'test' or password != 'test':
        return jsonify({"msg": "Bad username or password"}), 401
    # Query your database for username and password
    # user = User.query.filter_by(email=email, password=password).first()
    # if user is None:
        # # the user was not found on the database
        # return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
       

@api.route('/login', methods=['POST']) 
def login():
    data = request.json
    
    user = User.query.filter_by(email=data["email"], password=data["password"]).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401
    access_token=create_access_token(identity=user.email)
    
    return jsonify({"token": access_token, "user": user.serialize()})

@api.route("/register", methods=["POST"])
def register():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()
    if user:
        return jsonify({"msg": "User already exists."}), 401
    new_user = User(
        password=data["password"],
        email=data["email"],
    )
    db.session.add(new_user) 
    db.session.commit()

    return jsonify({"msg" : "Success" })