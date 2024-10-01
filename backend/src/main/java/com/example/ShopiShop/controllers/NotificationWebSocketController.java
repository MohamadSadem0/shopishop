package com.example.ShopiShop.controllers;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // Allow requests from your frontend origin
@RequiredArgsConstructor
public class NotificationWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    // Method to send notifications to the SuperAdmin via WebSocket
    public void sendNotificationToSuperAdmin(String notificationMessage) {
        messagingTemplate.convertAndSend("/topic/superadmin-notifications", notificationMessage);
    }
}
