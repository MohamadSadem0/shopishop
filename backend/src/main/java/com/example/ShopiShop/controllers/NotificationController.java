package com.example.ShopiShop.controllers;

import com.example.ShopiShop.servicesIMPL.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // Allow requests from frontend
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationServiceImpl notificationService;

    @PostMapping("/api/notify-superadmin")  // POST endpoint
    public void notifySuperAdmin(@RequestBody String message) {
        System.out.println("Received API request to notify superadmin with message: " + message);  // Log incoming request
        notificationService.sendNotificationToSuperAdmin(message);
    }
}
