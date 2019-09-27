

import java.io.*;
import java.util.regex.*;

import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

class Parser {
    public static void main(String[] args) {

        try {
            //File input = new File("../Glosariusz_SPPW_-_Finanse_acro.html");
            File input = new File("test.html");
            Document doc = Jsoup.parse(input, "UTF-8");

            Element head = doc.head(); //same as doc.getElementsByTag("head")
            //System.out.println(head.html());
            //System.out.println(head.outerHtml());
            
            Element body = doc.body();
            
            Elements children = body.children();
            for (Element child : children) {
                if (child.normalName() == "p") {
                    // guard against a gaint enclosing paragraph
                    if (child.text().length() > 5000000) { // 5 meg
                        continue;
                    }
                    System.out.println();
                    Pattern pattern = Pattern.compile("(.+•.+)+•.*"); // there can be 7 occurances of • in one line  
                    Matcher matcher = pattern.matcher(child.text());
                    boolean b = matcher.matches();
                    if (b) {
                        System.out.println(child.outerHtml());

                    }
                }
            }

              
        } catch (Exception e) {
            System.out.println(e);
            System.exit(1);
        }


        
    }
}
