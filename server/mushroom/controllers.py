import Image
from pyocr import pyocr
from ocr import builders
from flask import render_template, request, redirect, Response
from mushroom import app, redis
from mushroom.summary import SummaryTool


@app.route('/postImage', methods=['POST'])
def postImage():
    image_file = request.files['file']
    text = "Hello Glass"
    tools = pyocr.get_available_tools()[:]
    if len(tools) > 0:
        text = tools[0].image_to_string(Image.open(image_file), lang='eng', psm='6', builder=builders.TextBuilder())

    st = SummaryTool()
    sentences_dic = st.get_senteces_ranks(text)
    summary = st.get_summary(text, sentences_dic)

    redis.publish('notifications', summary)
    print "=========================================\n"
    print text
    print "=========================================\n"
    print summary
    print "=========================================\n"
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