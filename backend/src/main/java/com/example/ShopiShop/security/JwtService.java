package com.example.ShopiShop.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final static String SERCRET_KEY="4a1684e3c328c385c8546fff6d46c79ef2d0581b98fff24bfd873e5c86d383d2";

    public String extractUsername(String token) {
        return  extractClain(token, Claims::getSubject);
    }
    public <T> T extractClain(String token, Function<Claims,T> claimResolver){
         final Claims claims=extractAllClaims(token);
         return claimResolver.apply(claims);
    }

    public String generateToken(
        Map<String,Object> extraClaims,
                UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt();
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build().parseClaimsJwt(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SERCRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

