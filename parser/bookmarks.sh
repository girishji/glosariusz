
# https://stackoverflow.com/questions/723157/how-to-insert-a-newline-in-front-of-a-pattern
# https://blog.scrapinghub.com/2016/10/27/an-introduction-to-xpath-with-examples
# https://stackoverflow.com/questions/2777579/how-to-output-only-captured-groups-with-sed
# https://www.perlmonks.org/bare/?node_id=536492
# https://stackoverflow.com/questions/26709071/linux-bash-xmllint-with-xpath

PERL_UNICODE=S xpath ../resources/xml/Glosariusz_SPPW_-_Bankowosc.xml '//bookmark/@title' 2>/dev/null \
    | sed 's/title=/\'$'\n/g' \
    | sed -En 's/^"(.+•)+([^–]+).+/\1\2/p' \
    | while read x; do # account for 2 extreneous cases
          if echo $x | grep \" > /dev/null; then
              echo $x | sed 's/- spłata.*//g' |sed 's/• The.*//g'
          else
              echo $x
          fi;
      done 
