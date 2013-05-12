import sys, Image
from pyocr import pyocr
sys.path = ["src"] + sys.path
import builders

tools = pyocr.get_available_tools()[:]
if len(tools) == 0:
    print "No OCR tool found"
    sys.exit(1)
print tools[0].image_to_string(Image.open('test.jpg'), lang='eng', psm='6',
                         builder=builders.TextBuilder())