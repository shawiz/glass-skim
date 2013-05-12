from flask import render_template, request, redirect, Response
from mushroom import app, redis

@app.route('/postText', methods=['POST'])
def postText():
    print "wait..."
    text = request.form.get('imageData')
    print text
    redis.publish('notifications', text)
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