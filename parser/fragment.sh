# http://zvon.org/xxl/XPathTutorial/General/examples.html

if [ "$#" -lt 2 ]; then
    echo "error"
    exit 1
fi

dir="files"
mkdir -p ./$dir

token=-1
last_token=""

while IFS= read -r line; do
    if [ "$token" == "-1" ]; then
        token=$line
    else

        digest=$(echo $token | md5)
        filename=$(echo $digest | sed 's/^.........................../a/')
        if [ -f "$dir/$filename" ]; then
            echo "Warning: $dir/$filename already exists"
            continue
        fi

        echo "generating file for $token (file: $dir/$filename)"

        
        echo "" > temp_frag
        PERL_UNICODE=S xpath  $2 "//P[Link and starts_with(text(), \"$token\")] | //P[Link and starts_with(text(), \"$token\")]/following-sibling::*" \
                    > temp_frag 2> /dev/null
        
        # add a dummy root node
        sed -i -e '1s/^/<document>/' temp_frag
        echo "</document>" >> temp_frag

        PERL_UNICODE=S xpath temp_frag "//P[Link and starts_with(text(), \"$line\")]/preceding-sibling::*" > $dir/$filename 2> /dev/null

        rm -f temp_frag temp_frag-e

        token=$line
    fi
    last_token=$line
done < $1

# last line
token=$last_token

digest=$(echo $token | md5)
filename=$(echo $digest | sed 's/^.........................../a/')

if [ -f "$dir/$filename" ]; then
    echo "Warning: $dir/$filename already exists"
else
    echo "generating file for $token (file: $filename)"

    PERL_UNICODE=S xpath $2 "//P[Link and starts_with(text(), \"$token\")] | //P[Link and starts_with(text(), \"$token\")]/following-sibling::*" \
                > $dir/$filename 2> /dev/null
fi
