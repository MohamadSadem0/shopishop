package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.models.User;
import com.example.ShopiShop.models.VerificationToken;
import com.example.ShopiShop.repositories.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(user);
        myToken.setToken(token);
        tokenRepository.save(myToken);
    }

    public VerificationToken getVerificationToken(String VerificationToken) {
        return tokenRepository.findByToken(VerificationToken).orElseThrow(()->new RuntimeException("token not found"));
    }

    // Additional methods to validate the token, etc.
}
