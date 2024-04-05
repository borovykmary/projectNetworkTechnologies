package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.commontypes.UserRole;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.AuthEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.mysql.cj.sasl.ScramSha1SaslClient;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${token.sign.key}$")
    private String signingKey;
    private long expirationTime = 1000 * 60 * 24;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public Integer extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("userId", Integer.class));
    }

    public String generateToken(AuthEntity userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String token) {
        try {
            final String userName = extractUsername(token);
            return (!userName.isEmpty()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String generateToken(Map<String, Object> extraClaims, AuthEntity userDetails) {
        extraClaims.put("role", userDetails.getRole());
        extraClaims.put("userId", userDetails.getUser().getUserId());

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey())
                .compact();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(signingKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public UserRole extractRole(String token) {
        String roleString = extractClaim(token, (claims) -> claims.get("role", String.class));
        return UserRole.valueOf(roleString);
    }

}



