

import java.io.*;
import java.util.regex.*;

import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

// output a javascript list with an array of tuples

class Parser {
    public static void main(String[] args) {
        System.out.println("var index = [");

        String file = "../resources/Glosariusz_SPPW_-_Bankowosc.html";
        String linkPrefix = "Glosariusz_SPPW_-_Bankowosc/part";
        parse(file, linkPrefix, true);

        file = "../resources/Glosariusz_SPPW_-Rachunkowosc.html";
        linkPrefix = "Glosariusz_SPPW_-Rachunkowosc/part";
        parse(file, linkPrefix, false);

        file = "../resources/Glosariusz_SPPW_-_Finanse.html";
        linkPrefix = "Glosariusz_SPPW_-_Finanse/part";
        parse(file, linkPrefix, false);

        System.out.println("];");
    }

    private static String[] parse(String filename, String prefix, boolean isBanking) { // give filename with path
        String[] list = new String[0];
        try {
            File input = new File(filename);
            Document doc = Jsoup.parse(input, "UTF-8");

            Elements links = doc.select("a[href]");
 
            for (Element link : links) {
                //String absurl = link.attr("abs:href");
                String url = link.attr("href");
                
                if (url.contains(prefix)) {
                    String text = link.text();
                    //System.out.println(text);

                    // banking has a pattern that has '–' which is not '-' 
                    Pattern pattern = isBanking ? Pattern.compile("(.+•)+(.+–){1}.*")
                        : Pattern.compile("(.+•.+)+•.*"); // there can be 7 occurances of • in one line

                    // https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html
                    // [<8;24;11mhttps://stackoverflow.com/questions/5319840/greedy-vs-reluctant-vs-possessive-quantifiers
                    Matcher matcher = pattern.matcher(text);
                    String matched = "";
                    if (matcher.matches()) {
                        matched = matcher.group(1);
                        StringBuilder keyStr = new StringBuilder();

                        //System.out.println(matched);
                        keyStr.append(joinWord(matched));
                        if (isBanking) {
                            // append the last fragment
                            String longfrag = matcher.group(2).trim();
                            // even with non-greedy option, it matches as many '–' as it can, we need only first fragemnt
                            String[] parts = longfrag.split("–");
                            String fragment = parts[0];
                            fragment = fragment.substring(0, fragment.length() - 1); // remove the last '–' char
                            keyStr.append(" ");
                            keyStr.append(joinWord(fragment));
                            //System.out.println(joinWord(fragment));
                        }
                        System.out.println("  [ '" + keyStr.toString() + "'" + " ], " + "[ '" + url + "' ],");

                    } else {
                        //System.out.println("UNMATCHED: " + text + " : " + url);
                        if (! text.contains("Next")) {
                            System.out.println("  [ '" + text + "'" + " ], " + "[ '" + url + "' ],");
                        }
                    }
                                                                
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            System.exit(1);
        }
        return list;
    }

    private static String joinWord(String input) { // make 'xyz- jkl' into xyzjkl
        final StringBuilder output = new StringBuilder(1024);

        final String[] words = input.trim().split("\\s+") ;
        for(String word : words) {
            if(word.endsWith("-")) {
                word = word.substring(0, word.length() - 1);
                output.append(word);
            } else {
                output.append(word);
                output.append(' ');
            }
        }
        return output.toString().trim();
    }

}
