package com.example.ShopiShop.servicesIMPL;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@example.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }



    public void sendTestEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail); // Recipient's email address
        message.setSubject("Test Email from Spring Boot");
        message.setText("This is a test email sent from Spring Boot.");
        message.setFrom("your-gmail-address@gmail.com"); // Replace with your email

        // Send the email
        mailSender.send(message);
    }
}
