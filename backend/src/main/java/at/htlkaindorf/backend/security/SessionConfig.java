package at.htlkaindorf.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
public class SessionConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        // Erlaubt das Senden von Cookies über Cross-Origin-Anfragen
        serializer.setSameSite("None");
        // Muss für lokale Tests über HTTP auf 'false' gesetzt werden.
        // In Produktion mit HTTPS auf 'true' setzen.
        serializer.setUseSecureCookie(false);
        return serializer;
    }
}
