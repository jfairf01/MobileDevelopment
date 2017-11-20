from sqlalchemy import *
from . import main
from flask import jsonify
from .. import db
from ..models import *
import sys

@main.route('/first_names', methods=['GET', 'POST'])
def first_names():
  users = User.query.order_by(User.first_name).all()
  first_names = []
  for usr in users:
    first_names.append(usr.first_name)
  something = "yes"
  return jsonify(first_names)

  