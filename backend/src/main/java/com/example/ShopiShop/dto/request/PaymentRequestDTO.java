package com.example.ShopiShop.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentRequestDTO {
    private String paymentMethod;  // Payment method (e.g., CREDIT_CARD, PAYPAL)
    private BigDecimal amount;
}
