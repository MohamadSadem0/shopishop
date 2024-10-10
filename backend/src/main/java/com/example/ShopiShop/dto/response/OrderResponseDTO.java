package com.example.ShopiShop.dto.response;

import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDTO {
    private Long id;
    private Long userId;
    private List<UUID> productIds;  // List of products in the order
    private PaymentResponseDTO payment;  // Payment information
    private DeliveryResponseDTO delivery;  // Delivery information
    private String orderStatus;
    private Date orderDate;
}
