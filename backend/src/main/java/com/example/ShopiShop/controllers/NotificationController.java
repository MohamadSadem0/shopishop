package com.example.ShopiShop.controllers;

import com.example.ShopiShop.servicesIMPL.NotificationServiceImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class NotificationController {

    private final NotificationServiceImpl notificationService;

    public NotificationController(NotificationServiceImpl notificationService) {
        this.notificationService = notificationService;
    }

    // This endpoint is secured so that only users with the SUPERADMIN role can send notifications
    @PostMapping("/api/notify-superadmin")
    public void notifySuperadmin(@RequestBody String message) {
        notificationService.sendNotificationToSuperAdmin(message);
    }
}
