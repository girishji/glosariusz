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

def bookmark_full_text(token, tree):
    """In cases where token has no description in body of doc, reuse description from bookmark. """
    bookmarks = tree.findall("//bookmark[@title]")
    for item in bookmarks:
        bm = item.get('title')
        if token in bm:
            return bm
    sys.exit()

def remove_orphans(tokens, elements, tree):
    # Deal with bookmarks with no description in body
    removables = []
    for i, token in enumerate(tokens):
        plink = bookmark_description(elements, token)
        if plink is None:
            frag = initialize_frag(None, token, bookmark_full_text(token, tree))
            removables.append(token)
            write_frag(frag)
            
    # remove tokens without descr.
    for rem in removables:
        tokens.remove(rem)

def fragments(filename, dest = 'fragments'): 
    """Create html file with content for each search key."""
    tree = etree.parse(filename)
    tokens = bookmarks(tree)
    elements = bookmark_description_list(tree)

    # XXX
    #tokens = remove_orphans(tokens, elements, tree)
    
    for i, token in enumerate(tokens):
        if i == 0:
            continue
        if i == 2:
            break
        plink = bookmark_description(elements, token)
        if plink is None:
            sys.exit('bookmark description not foudn')
        frag = initialize_frag(plink, token)
        # get siblings after this token
        siblings = plink.xpath('./following-sibling::*')
        #for sibling in siblings:
        #    print(sibling.tag, sibling.text)
        next_token = None
        if i != (len(tokens) - 1): # not the last token
            next_token = tokens[i + 1]
            found = False
            for sibling in siblings:
                next_element = bookmark_description(elements, next_token)
                if equal(sibling, next_element):
                    found = True
                    break; # done for this token
                frag.append(sibling)
            if not found:
                print(token, "next token", next_token, " not found")
                sys.exit('next token not found')
        else: # last token
            for sibling in siblings:
                frag.append(sibling)
        write_frag(frag)
    print 'DONE', len(tokens)

def bookmark_description(elements, token):
    """Find P/Link element in the doc corresponding to bookmark (token)"""
    for pl in elements:
        if contains(pl, token):
            return pl
    else: # for loop not finding next P/Link
        print('Error: cannot find Element for', token)
        return None
    
def bookmark_description_list(tree):
    """Return a list of all Elements that contain the tokens with description."""
    return tree.findall('//P[Link]') + tree.findall('//H3[Link]') + tree.findall('//H4[Link]') \
        + tree.findall('//H3') + tree.findall('//P')
    
def equal(elem, plink):
    """Return true if these two elements are the same. """
    elem_text = ''.join(elem.itertext())
    plink_text = ''.join(plink.itertext())
    if (plink_text == elem_text):
        return 1
    return 0
    
def initialize_frag(elem, token, token_full_text=""):
    """Create a new xml tree with a root and add first element (bookmark description element) """
    text = ""
    if token_full_text:
        text = token_full_text
    else:
        text = ''.join(elem.itertext())
        if contains(elem, token) == 2:
            siblings = elem.xpath('./following-sibling::*')
            if len(siblings) >= 1:
                sibling = siblings[0]
                text = text + ''.join(sibling.itertext())
        
    # filter
    frag = etree.Element('Frag')
    child = etree.SubElement(frag, 'Main')
    nchild = etree.SubElement(child, 'Token')
    nchild.text = token
    nchild = etree.SubElement(child, 'Description')
    nchild.text = filter_out(token, text)
    return frag

def filter_out(token, text):
    text = clean_str(text, ' ')
    token = clean_str(token, ' ')
    i, j = 0, 0
    while i < len(token) and j < len(text):
        if token[i] == ' ':
            i += 1
        elif text[j] == ' ':
            j += 1
        elif token[i] != text[j]:
            sys.exit('token and text mismatch ' + token + ' [TEXT]: ' + text)
        else:
            i += 1
            j += 1

    if i == len(token):
        if j != len(text):
            return text[j:]
        
    sys.exit('token and text length mismatch')
    
def contains(plink, token):
    """If plink text contains token"""
    str1 = ''.join(plink.itertext())
    str2 = token
    str1c = clean_str(str1)
    str2c = clean_str(str2)
    ##if str2c in str1c.encode('utf-8'):
        
    if str1c.startswith(str2c):
        return 1 # true

    if (prefix(filename) == 'finanse' or prefix(filename) == 'rachunkowosc'):
        siblings = plink.xpath('./following-sibling::*')
        if len(siblings) >= 1:
            sibling = siblings[0]
            str3 = str1 + ''.join(sibling.itertext())
            str3c = clean_str(str3)
            if str3c.startswith(str2c):
                return 2

    return 0

def clean_str(s, insert=''):
    # remove non breaking space characters with simple space, new lines and - sign with space
    s = s.replace(u'\xa0', u' ')
    s = s.replace(u'\u202f', u' ')
    s = re.sub('[\s -]', insert, s)
    return s
    
def prefix(filename):
    if 'Bankowosc' in filename:
        return 'bankowosc'
    if 'Finanse' in filename:
        return 'finanse'
    if 'Rachunkowosc' in filename:
        return 'rachunkowosc'
    print("Error")
    sys.exit('prefix mismatch')

def write_frag(frag):
    # Replace sys.stdout with a file object pointing to your object file:
    etree.ElementTree(frag).write(sys.stdout, encoding='utf-8', xml_declaration = True, pretty_print = True)
    
#filename = '../resources/xml/Glosariusz_SPPW_-_Bankowosc_modified.xml'
#filename = '../resources/xml/Glosariusz_SPPW_-_Finanse_modified.xml'
filename = '../resources/xml/Glosariusz_SPPW_-Rachunkowosc_modified.xml'

fragments(filename)



            
