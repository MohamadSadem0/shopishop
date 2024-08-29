package com.example.ShopiShop.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String extractUsername(String token) {
        return  null;
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder() .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    }

