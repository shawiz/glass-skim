import Image
from pyocr import pyocr
from ocr import builders
from flask import render_template, request, redirect, Response
from mushroom import app, redis


@app.route('/postImage', methods=['POST'])
def postImage():
    image_file = request.files['file']
#    f.save('/var/www/uploads/uploaded_file.jpg')
    text = "hello"
    tools = pyocr.get_available_tools()[:]
    if len(tools) > 0:
        text = tools[0].image_to_string(Image.open(image_file), lang='eng', psm='6', builder=builders.TextBuilder())
    redis.publish('notifications', text)
    print text
    print "published"
    return ""


def event_stream():
    pubsub = redis.pubsub()
    pubsub.subscribe('notifications')
    for message in pubsub.listen():
        print message
        yield 'data: %s\n\n' % message['data']


@app.route('/post', methods=['POST'])
def post():
    redis.publish('notifications', 'Hello!')
    return redirect('/')
 

@app.route('/stream')
def stream():
    return Response(event_stream(), mimetype="text/event-stream")


@app.route('/')
def index():
    return '''
<html>
<head>
    <script>
        var source = new EventSource('/stream');
        source.onmessage = function (event) {
             console.log(event.data);
        };
    </script>
</head>
<body>
    <form method="POST" action="/post">
        <input type="submit"/>
    </form>
</body>
</html>
 
'''