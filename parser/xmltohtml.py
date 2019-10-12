import lxml.html
from lxml import etree
import sys

xml_file = sys.argv[1]
xslt_file = sys.argv[2]

xslt_doc = etree.parse(xslt_file)
xslt_transformer = etree.XSLT(xslt_doc)

source_doc = etree.parse(xml_file)
output_doc = xslt_transformer(source_doc)

print(str(output_doc))
#output_doc.write("output-toc.html", pretty_print=True)
