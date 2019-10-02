# http://zvon.org/xxl/XPathTutorial/General/examples.html

if [ "$#" -lt 1 ]; then
    echo "error"
    exit 1
fi


echo "" > temp_frag
PERL_UNICODE=S xpath  ../resources/xml/Glosariusz_SPPW_-_Bankowosc.xml \
            "//P[Link and starts_with(text(), \"$1\")] | //P[Link and starts_with(text(), \"$1\")]/following-sibling::*" \
            > temp_frag 2>/dev/null
    
# add a dummy root node
sed -i -e '1s/^/<document>/' temp_frag
echo "</document>" >> temp_frag

if [ ! -z "$2" ]; then
    PERL_UNICODE=S xpath temp_frag "//P[Link and starts_with(text(), \"$2\")]/preceding-sibling::*" 2>/dev/null
fi

rm -f temp_frag temp_frag-e
