# -*- coding: utf-8 -*-

# Run 'python this_script'

# https://lxml.de/api.html
# https://docs.python.org/2/library/xml.etree.elementtree.html
# https://docs.python.org/3/tutorial/index.html
# https://stackoverflow.com/questions/21129020/how-to-fix-unicodedecodeerror-ascii-codec-cant-decode-byte
# https://stackoverflow.com/questions/279561/what-is-the-python-equivalent-of-static-variables-inside-a-function

# exec(open("./parser.py").read())

from lxml import etree
import re
import sys
import itertools

def bookmarks(tree):
    """Extract bookbarks and return a list of tokens for searching."""
    
    tokens = []
    # Use xpath
    bookmarks = tree.findall("//bookmark[@title]")
        
    for item in bookmarks:
        bm = item.get('title')

        if prefix(filename) == 'bankowosc':
            partition = bm.partition(u'–')
            if partition[1]:
                tokens.append(partition[0].rstrip())
            else:
                # deal with 2 exceptions
                partition = bm.partition('-')
                if partition[1]:
                    tokens.append(partition[0].rstrip())
                else:
                    partition = bm.rpartition(u'•')
                    tokens.append(partition[0].rstrip())
        else:                    
            # rachunkowosc and finanse
            partition = bm.rpartition(u'•')
            if partition[1]:
                tokens.append(partition[0].rstrip())
            else:
                tokens.append(bm.rstrip('.'))

    return tokens

def bookmark_element(elements, token):
    """Find P/Link element in the doc corresponding to bookmark (token)"""
    for pl in elements:
        if contains(pl, token):
            return pl
    else: # for loop not finding next P/Link
        print('Error: cannot find Element for', token)
        return None
        #sys.exit()
    
def bookmark_elements(tree):
    """Return a generator over all Elements that contain the tokens with description."""
    return tree.findall('//P[Link]') + tree.findall('//H3[Link]') + tree.findall('//H4[Link]') \
        + tree.findall('//P')
    
def fragments(filename, dest = 'fragments'): 
    """Create html file with content for each search key."""
    tree = etree.parse(filename)
    tokens = bookmarks(tree)
    elements = bookmark_elements(tree)
    
    # Some tokens don't have descriptions, remove them
    removables = []
    for i, token in enumerate(tokens):
        plink = bookmark_element(elements, token)
        if plink is None:
            removables.append(token)
    # removing here, and not during iteration
    for rem in removables:
        tokens.remove(rem)

    for i, token in enumerate(tokens):
        plink = bookmark_element(elements, token)
        initialize_tree(plink, token)
        # get siblings after this token
        siblings = plink.xpath('./following-sibling::*')
        next_token = None
        if i != (len(tokens) - 1): # not the last token
            next_token = tokens[i + 1]
            found = False
            for sibling in siblings:
                if equal(sibling, bookmark_element(elements, next_token)):
                    found = True
                    break; # done for this token
                format_element(sibling)
            if not found:
                print(token, "next token", next_token, " not found")
                for sibling in siblings:
                    print(sibling.text)

    print 'DONE', len(tokens)

def equal(elem, plink):
    """Return true if token is the beginning of the element text """
    elem_text = ''.join(elem.itertext())
    plink_text = ''.join(elem.itertext())
    if (plink_text == elem_text):
        return 1
    return 0
    

def initialize_tree(elem, token):
    """Create a new xml tree with a root and add first element (bookmark description element) """
    part = etree.Element("Part") # root of tree
    # format the element
    elem_text = ''.join(elem.itertext())
    

    
def contains(plink, token):
    """If plink text contains token"""
    str1 = ''.join(plink.itertext())
    str2 = token
            
    # compare first two elements separated by • for this file
    #str2_n = ""
    #if prefix(filename) == 'finanse' or prefix(filename) == 'rachunkowosc':
    #    partition = str2.rpartition(u'•')
    #    if partition[1]:
    #        str2_n = partition[0].rstrip()
    #        str2_n = str2_n.replace(u'\xa0', u' ')
    #        str2_n = re.sub('[\s -]', '', str2_n)
            
    # remove non breaking space characters with simple space
    str1 = str1.replace(u'\xa0', u' ')
    str2 = str2.replace(u'\xa0', u' ')
    str2 = str2.replace(u'\u202f', u' ')

    # remove - sign and whitespaces
    str1c = re.sub('[\s -]', '', str1) 
    str2c = re.sub('[\s -]', '', str2)
    #if str2c in str1c.encode('utf-8'):
        
    if str2c in str1c:
        return 1 # true
    #if (prefix(filename) == 'finanse' or prefix(filename) == 'rachunkowosc') and str2_n in str1c:
    #    return 2
    return 0

def prefix(filename):
    if 'Bankowosc' in filename:
        return 'bankowosc'
    if 'Finanse' in filename:
        return 'finanse'
    if 'Rachunkowosc' in filename:
        return 'rachunkowosc'
    print("Error")
    sys.exit()


#filename = '../resources/xml/Glosariusz_SPPW_-_Bankowosc_modified.xml'
#filename = '../resources/xml/Glosariusz_SPPW_-_Finanse_modified.xml'
filename = '../resources/xml/Glosariusz_SPPW_-Rachunkowosc_modified.xml'

fragments(filename)



            
