package com.example.ShopiShop.servicesIMPL;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl {

    private final SimpMessagingTemplate messagingTemplate;

    // Method to send notifications to the SuperAdmin via WebSocket
    public void sendNotificationToSuperAdmin(String notificationMessage) {
        System.out.println("Sending notification to WebSocket: " + notificationMessage);  // Debug log
        messagingTemplate.convertAndSend("/topic/superadmin-notifications", notificationMessage);
        System.out.println("Notification sent successfully to /topic/superadmin-notifications");  // Confirmation log
    }
}
