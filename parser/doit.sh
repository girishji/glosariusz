# create frags

# terminate immediately if anything fails
set -e


function main {

    python ./parser.py ../resources/xml/Finanse.xml
    python ./parser.py ../resources/xml/Bankowosc.xml
    python ./parser.py ../resources/xml/Rachunkowosc.xml 

    # prepare dest dir
    dir="../www/frags"
    if [ ! -d $dir ]; then
        mkdir -p $dir
    fi
    
    fcount=$(find $dir -maxdepth 1 -type f | wc -l)
    if [ "$fcount" != "0" ]; then
        echo "removing all files in $dir except images subdir" 
        find $dir -maxdepth 1 -type f | while read x;do
                                            rm -f $x
                                        done
    fi

    sdir="./frags"
    cp $sdir/bankowosc.xml $dir
    cp $sdir/finanse.xml $dir
    cp $sdir/rachunkowosc.xml $dir

    for subdir in ba fi ra; do
        fdir="$sdir/$subdir"
        ls -1 $fdir | while read x;do
                          if [ -f "$dir/$x" ]; then
                              echo "$dir/$x exists"
                              dsize=$(stat -f "%z" "$dir/$x")
                              ssize=$(stat -f "%z" "$fdir/$x")
                              if [ $ssize -gt $dsize ]; then
                                  echo "replacing $dir/$x"
                                  mv $dir/$x "$dir/${x}_1"
                                  mv $fdir/$x $dir/
                              fi
                          else
                              mv $fdir/$x $dir/
                          fi
                      done
    done

    if [ ! -d "$dir/images" ]; then
        cp -r ../resources/xml/images $dir
    fi
    
}

main
