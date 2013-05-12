from redis import StrictRedis
from flask import Flask
from mushroom.config import settings

app = Flask(__name__)
redis = StrictRedis()

import mushroom.controllers
