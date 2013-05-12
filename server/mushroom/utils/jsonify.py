try:
	import simplejson as json
except ImportError:
	try:
		import json
	except ImportError:
		raise ImportError
from werkzeug import Response
from functools import wraps


def jsonify(*args, **kwargs):
	""" jsonify with support for MongoDB ObjectId
	"""
	return Response(json.dumps(dict(*args, **kwargs), cls=json.JSONEncoder), mimetype='application/json')

# JSON wrapper for flask
def jsoned(f):
	@wraps(f)
	def wrapped(*args, **kwargs):
	#	try:
		return jsonify(f(*args, **kwargs))
	#	except Exception, e:
	#		print e
	#		return jsonify({"error": unicode(e)})

	return wrapped