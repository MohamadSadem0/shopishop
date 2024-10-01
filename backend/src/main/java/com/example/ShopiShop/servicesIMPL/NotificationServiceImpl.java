package com.example.ShopiShop.servicesIMPL;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationServiceImpl(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Send a notification to superadmin if the user has the correct role
    public void sendNotificationToSuperAdmin(String message) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_SUPERADMIN"))) {
            // If user is superadmin, send the notification
            messagingTemplate.convertAndSend("/topic/superadmin-notifications", message);
            System.out.println("Notification sent to superadmin: " + message);
        } else {
            System.out.println("Unauthorized access: User is not superadmin");
        }
    }
}
