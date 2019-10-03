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

    banking = 0
    if prefix(filename) in 'bankowosc':
        banking = 1
        
    for item in bookmarks:
        bm = item.get('title')

        if banking:
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

def bookmark_element(tree, token):
    """Find P/Link element in the doc corresponding to bookmark (token)"""
    p_with_links = tree.findall('//P[Link]')
    h3_with_links = tree.findall('//H3[Link]')
    h4_with_links = tree.findall('//H4[Link]')
    p_without_links = tree.findall('//P')
    
    #print token
    
    for pl in itertools.chain(p_with_links, h3_with_links, h4_with_links, p_without_links):
        text = ''.join(pl.itertext())
        if contains(text, token):
            return pl
    else: # for loop not finding next P/Link
        print('Error: cannot find next Element for', token)
        return None
        #sys.exit()
    

def fragments(filename, dest = 'fragments'): 
    """Create html file with content for each search key."""
    tree = etree.parse(filename)
    tokens = bookmarks(tree)

    removables = []
    for i, token in enumerate(tokens):
        print '==================================================='
        last_token = 0
        if i == (len(tokens) - 1): # last token
            last_token = 1
        else:
            plink = bookmark_element(tree, token)
            if plink is None:
                removables.append(token)
            else:
                format_element(plink)
                # get siblings after this token
                siblings = plink.xpath('./following-sibling::*')
                for sibling in siblings:
                    if not last_token:
                        next_token = tokens[i + 1]
                        if same_as(sibling, next_token):
                            break; # done for this token

                    format_element(sibling)
    # removing it here, not during iteration
    for rem in removables:
        tokens.remove(rem)
        
    print 'DONE', len(tokens)

def same_as(elem, token):
    """Return true if token is the beginning of the element text """
    regexs = [ '../P/Link', '../H3/Link', '../H4/Link', '../P' ] 
    for reg in regexs:
        if len(elem.xpath(reg)) == 1:
            text = ''.join(elem.itertext())            
            if contains(text, token):
                return 1
    return 0
    

def format_element(elem):
    print elem.text

def contains(str1, str2):
    """If str1 contains str2"""
    # remove - sign and whitespaces
    str1c = re.sub('[\s -]', '', str1) 
    str2c = re.sub('[\s -]', '', str2)
    #if str2c in str1c.encode('utf-8'):
    if str2c in str1c:
        return 1 # true
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


filename = '../resources/xml/Glosariusz_SPPW_-_Bankowosc_modified.xml'
fragments(filename)



            
