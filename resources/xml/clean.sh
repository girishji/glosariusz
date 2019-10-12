# remove Sect and Div tags from xml files before doing anything else

ls -1 *.xml | while read x; do
                  sed -e 's/<Sect>//g' -e 's/<\/Sect>//g' -e 's/<Div>//g' -e 's/<\/Div>//g' \
                      -e 's/<Caption>//g' -e 's/<\/Caption>//g' $x > ${x%%.*}.new
                  echo $x;
              done

ls -1 *.new | while read x; do
                  mv $x ${x%%.*}.xml
              done
