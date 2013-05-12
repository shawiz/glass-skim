from flask import Flask
from mushroom.config import settings

app = Flask(__name__)

import mushroom.controllers
