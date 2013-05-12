from flask import render_template, request, session, redirect, Response

from mushroom import app
from mushroom.utils.jsonify import jsoned

@app.route("/")
@jsoned
def get():
    return render_template('index.html')


@app.route("/test")
def get():
    return render_template('index.html')


@app.route('/postText', methods=['POST'])
def post():
    print "roger that"
    text = request.form.get('imageData')
    print text
    return ""