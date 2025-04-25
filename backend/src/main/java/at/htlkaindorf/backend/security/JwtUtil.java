package at.htlkaindorf.backend.security;

import at.htlkaindorf.backend.pojos.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

/**
* @author Johanna Hechtl
* @since 25.04.2025
*/

//@Component
public class JwtUtil {
//    @Value("${jwt.secret}")
//    private String secret;
//
//    @Value("${jwt.expiration}")
//    private long jwtExpirationInMs;
//
//    private SecretKey getSignKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secret);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//
//    public String generateToken(UserAccount user) {
//        return Jwts.builder()
//                .setSubject(user.getEmail())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
//                .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(getSignKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    public boolean isTokenValid(String token, UserAccount user) {
//        final String username = extractUsername(token);
//        return (username.equals(user.getEmail()) && !isTokenExpired(token));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractClaim(token, Claims::getExpiration).before(new Date());
//    }

}
