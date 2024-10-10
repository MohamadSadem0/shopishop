package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.PaymentRequestDTO;
import com.example.ShopiShop.dto.response.PaymentResponseDTO;
import com.example.ShopiShop.enums.PaymentMethodEnum;
import com.example.ShopiShop.exceptions.EntityNotFoundException;
import com.example.ShopiShop.mappers.PaymentMapper;
import com.example.ShopiShop.models.*;

import com.example.ShopiShop.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class PaymentServiceImpl {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentMapper paymentMapper;



    public PaymentResponseDTO createPayment(PaymentRequestDTO paymentRequestDTO) {
        Payment payment = paymentMapper.toPaymentEntity(paymentRequestDTO);  // Convert DTO to entity
        payment.setPaymentStatus("PENDING");  // Set default payment status
        payment = paymentRepository.save(payment);  // Save to database
        return paymentMapper.toPaymentResponseDTO(payment);  // Convert entity to response DTO
    }


    public PaymentResponseDTO getPaymentById(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
        return paymentMapper.toPaymentResponseDTO(payment);  // Convert entity to response DTO
    }
}
