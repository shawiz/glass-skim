import Image
import sys
from pyocr import pyocr

import codecs
import sys
import tempfile
sys.path = [ "src" ] + sys.path
import builders
import tesseract

tools = pyocr.get_available_tools()[:]
if len(tools) == 0:
    print "No OCR tool found"
    sys.exit(1)
print "Using '%s'" % (tools[0].get_name())
print tools[0].image_to_string(Image.open('test.jpg'), lang='eng', psm='6',
                         builder=builders.TextBuilder())