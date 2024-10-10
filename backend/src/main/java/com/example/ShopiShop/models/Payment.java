package com.example.ShopiShop.models;

import com.example.ShopiShop.enums.PaymentMethodEnum;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentMethodEnum paymentMethod;  // e.g., CREDIT_CARD, PAYPAL

    private BigDecimal amount;

    private String paymentStatus;  // e.g., COMPLETED, PENDING

    @OneToOne(mappedBy = "payment")
    private Order order;
}
