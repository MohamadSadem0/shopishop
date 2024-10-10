package com.example.ShopiShop.dto.request;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequestDTO {
    private Long userId;
    private List<UUID> productIds;  // List of product IDs being ordered
    private PaymentRequestDTO payment;  // Payment information
    private DeliveryRequestDTO delivery;  // Delivery information
}
