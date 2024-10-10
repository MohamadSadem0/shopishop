package com.example.ShopiShop.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponseDTO {
    private Long id;
    private String paymentMethod;  // Payment method (e.g., CREDIT_CARD, PAYPAL)
    private BigDecimal amount;
    private String paymentStatus;  // e.g., COMPLETED, PENDING
}
