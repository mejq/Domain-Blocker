// regex (?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]
//whitelist = "https://www.haraankara.com/" , "https://obs.ankara.edu.tr/account/login?returnurl=/"
package com.example.commonLibrary.util;
import java.util.List;
import java.util.regex.Pattern;
public class DomainValidator {

    private static final Pattern Domain_regex = Pattern.compile("(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]");

    private static final List<String> WHITELIST = List.of("google.com", "github.com","https://www.haraankara.com/","https://obs.ankara.edu.tr/account/login?returnurl=/");

    public static boolean isValid(String domain) {
        return Domain_regex.matcher(domain).matches() && !WHITELIST.contains(domain.toLowerCase()); //regex ile uyumluysa & wh
    }
}
