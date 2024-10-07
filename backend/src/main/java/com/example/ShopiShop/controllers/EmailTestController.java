package com.example.ShopiShop.controllers;

import com.example.ShopiShop.servicesIMPL.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/public/sendTestEmail")
    public String sendTestEmail(@RequestParam("to") String toEmail) {
        emailService.sendTestEmail(toEmail);
        return "Test email sent to " + toEmail;
    }
}
