# -*- coding: utf-8 -*-

# Run 'python this_script'
# XML parser of PDF files - Girish Palya

import xml.etree.ElementTree as ET
import re
import sys
import md5
import os.path
import os

############################################################

def parse(filename):
    
    tree = ET.parse(filename)
    root = tree.getroot()

    # get a dictionary of token -> bookmark element
    tokens = read_bookmarks(root)
    write_tokens(tokens.keys())

    # rank tokens based on position in document
    element_list = get_part(root)
    # print_all_tags(element_list)
    ranking = rank_tokens(tokens.keys(), element_list)

    # Make fragments and write to files
    fragment(ranking, element_list)

    # write out orphan tokens
    process_orphans(tokens, ranking)
    
############################################################

def print_all_tags(elements):
    found = set()
    for elem in elements:
        if elem.tag not in found:
            found.add(elem.tag)
        for descendent in elem.iter():
            if descendent.tag not in found:
                found.add(descendent.tag)
    for tag in found:
        print(tag)
            
############################################################

def fragment(ranking, elements):
    keys = ranking.keys()
    keys.sort()
    for i, key in enumerate(keys):
        token = ranking[key]
        begin, end = key, len(elements) - 1
        if i < (len(keys) - 1):
            end = keys[i + 1]
        # prepare the header text
        text = ''.join(elements[begin].itertext())
        if not starts_with(text, token):
            # concatenate next element and try again
            if begin < (end - 1) \
               and (prefix(filename) == 'finanse' \
                    or prefix(filename) == 'rachunkowosc'):
                text = text + ''.join(elements[begin + 1].itertext())
                begin = begin + 1
                if not starts_with(text, token):
                    sys.exit('error: ' + token + ' not found')

        frag = init_frag(token, text)
        for index in range(begin + 1, end):
            frag.append(elements[index])
        write_frag(frag, token)

############################################################

def init_frag(token, text):
    """Create a new xml tree with a root and add first element (bookmark description element) """
    frag = ET.Element('Frag')
    child = ET.SubElement(frag, 'Main')
    nchild = ET.SubElement(child, 'Token')
    nchild.text = token
    nchild = ET.SubElement(child, 'Description')
    nchild.text = filter_token(token, text)
    return frag

############################################################

def filter_token(token, text):
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

    if i == len(token) and j <= len(text):
        return text[j:]        
    sys.exit(token + ' :: ' + text + ' token and text length mismatch')
            
############################################################

def process_orphans(tokens, ranking):
    found = set(ranking.values())
    for token in tokens.keys():
        if not token in found:
            print(token, 'description not found')
            frag = init_frag(token, tokens[token])
            write_frag(frag, token)

############################################################

def rank_tokens(tokens, elements):
    """Iterate the Part subtree and order tokens based on position."""
    ranking = {}
    headers = set(['P', 'H3', 'H4'])
    for token in tokens:
        for i, child in enumerate(elements):
            if child.tag in headers:
                if (child.find('./Link') is not None) \
                or (child.find('./Figure') is not None):
                    if starts_with(''.join(child.itertext()), token):
                        #print('found', token)
                        ranking[i] = token
    # Make another attempt by looking at elements that do not contain <Link>
    found = set(ranking.values())
    for token in tokens:
        if not token in found:
            #print('looking for', token)
            for i, child in enumerate(elements):
                if child.tag in headers:
                    if starts_with(''.join(child.itertext()), token):
                        #print('found', token)
                        ranking[i] = token

    # Another attempt after concatenating next element
    if prefix(filename) == 'finanse' or prefix(filename) == 'rachunkowosc':
        found = set(ranking.values())
        for token in tokens:
            if not token in found:
                #print('looking for', token)
                for i, child in enumerate(elements):
                    if child.tag in headers:
                        if i < (len(elements) - 1):
                            text = ''.join(child.itertext()) \
                                   + ''.join(elements[i + 1].itertext())
                            if starts_with(text, token):
                                #print('found', token)
                                ranking[i] = token
    return ranking
                            
                        
############################################################

def starts_with(text, token):
    """If plink text contains token"""
    text = clean_str(text)
    token = clean_str(token)
    if text.startswith(token):
        return True
    return False

############################################################

def get_part(root):
    parts = root.findall('.//Part')
    if len(parts) != 3:
        sys.exit('Part not found')
    return parts[2]

############################################################

def read_bookmarks(root):
    """Extract bookbarks and return a dictionary of tokens -> elements."""
    
    tokens = {}
    # Use xpath
    bookmarks = root.findall('.//bookmark[@title]')
        
    for item in bookmarks:
        bm = item.get('title')

        if prefix(filename) == 'bankowosc':
            partition = bm.partition(u'–')
            if partition[1]:
                tokens = insert_token(tokens, partition[0].rstrip(), bm)
            else:
                # deal with 2 exceptions
                partition = bm.partition('-')
                if partition[1]:
                    tokens = insert_token(tokens, partition[0].rstrip(), bm)
                else:
                    partition = bm.rpartition(u'•')
                    tokens = insert_token(tokens, partition[0].rstrip(), bm)
        else:                    
            # rachunkowosc and finanse
            partition = bm.rpartition(u'•')
            if partition[1]:
                tokens = insert_token(tokens, partition[0].rstrip(), bm)
            else:
                tokens = insert_token(tokens, bm.rstrip('.'), bm)
    # remove empty elements
    for k in tokens.keys():
        if k is None or k == '':
            tokens.pop(k, None)
    return tokens

############################################################

def insert_token(tokens, tstring, bm):
    if tstring in tokens:
        sys.exit(tstring + ' already exists')
    tokens[tstring] = bm
    return tokens

############################################################

def clean_str(s, insert=''):
    # remove non breaking space characters with simple space, new lines and - sign with space
    s = s.replace(u'\xa0', u' ')
    s = s.replace(u'\u202f', u' ')
    s = re.sub('[\s -]', insert, s)
    return s

############################################################

def prefix(filename):
    if 'Bankowosc' in filename:
        return 'bankowosc'
    if 'Finanse' in filename:
        return 'finanse'
    if 'Rachunkowosc' in filename:
        return 'rachunkowosc'
    sys.exit('prefix mismatch')

############################################################

def write_tokens(tokens):
    frag = ET.Element('tokens')
    for token in tokens:
        child = ET.SubElement(frag, 'tk')
        # child = ET.SubElement(frag, 'tk', fn=get_filename(token))
        # after computing md5 sum remove
        child.text = clean_token(token)
        
    ET.ElementTree(frag).write(dbase + '/' + prefix(filename) + '.xml', \
                               encoding='utf-8', xml_declaration = True)
    
############################################################

def get_filename(token):
    c_token = clean_token(token)
    fname = md5.new(c_token.encode('utf8')).hexdigest()
    return fname[21:]


############################################################

def clean_token(token):
    s = token
    s = s.replace(u'\xa0', u' ')
    s = s.replace(u'\u202f', u' ')
    s = s.replace(u'&', u' ')
    return s

############################################################

def write_frag(frag, token):
    fname = get_filename(token)
    fpath = dirname + '/' + fname + '.xml'
    if os.path.isfile(fpath):
        # XXX ignore this error for now, tokens with + or ? or ▶ are
        #     misreported during comparison (I think)
        #sys.exit('error: ' + fname + ' exists, ' + token)
        print('error: ' + fname + ' exists, ' + token + ' : ignored for now XXX')
        return
    with open(fpath, 'wb') as f:
        f.write('<?xml version="1.0" encoding="UTF-8" ?>\n'
                + '<?xml-stylesheet href="../xsl/glosariusz.xsl" '
                + 'type="text/xsl"?>\n'.encode('utf8'))
        ET.ElementTree(frag).write(f, encoding = 'utf-8', xml_declaration = False)
    f.closed
    
        
############################################################

def get_dirname(dname):
    dirname = dname + '/' + prefix(filename)[:2]
    if not os.path.exists(dirname):
        os.makedirs(dirname)
    else:
        # remove all files
        for the_file in os.listdir(dirname):
            file_path = os.path.join(dirname, the_file)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(e)

    return dirname

############################################################

filename = sys.argv[1]
print(filename)
dbase = 'frags'
dirname = get_dirname(dbase)
parse(filename)
