import os
from mushroom import app


if __name__ == "__main__":
	port = int(os.environ.get('PORT', 5000))
	if port == 5000:
		app.debug = True
	app.run(threaded=True, host="0.0.0.0", port=port)
