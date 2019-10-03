
file="../resources/xml/Glosariusz_SPPW_-_Bankowosc_modified.xml"
bash ./bookmarks.sh $file bank > bankowosc.list

echo "$file bookmarks extracted"

bash ./fragment.sh bankowosc.list
