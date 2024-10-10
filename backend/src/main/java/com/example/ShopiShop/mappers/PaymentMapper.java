package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.PaymentRequestDTO;
import com.example.ShopiShop.dto.response.PaymentResponseDTO;
import com.example.ShopiShop.enums.PaymentMethodEnum;
import com.example.ShopiShop.models.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public Payment toPaymentEntity(PaymentRequestDTO dto) {
        return Payment.builder()
                .paymentMethod(PaymentMethodEnum.valueOf(dto.getPaymentMethod().toUpperCase()))
                .amount(dto.getAmount())
                .build();
    }

    public PaymentResponseDTO toPaymentResponseDTO(Payment payment) {
        return PaymentResponseDTO.builder()
                .id(payment.getId())
                .paymentMethod(payment.getPaymentMethod().name())
                .amount(payment.getAmount())
                .paymentStatus(payment.getPaymentStatus())
                .build();
    }
}
