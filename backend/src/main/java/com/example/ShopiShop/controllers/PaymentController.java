package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.PaymentRequestDTO;
import com.example.ShopiShop.dto.response.PaymentResponseDTO;
import com.example.ShopiShop.servicesIMPL.PaymentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/payments")
public class PaymentController {

    @Autowired
    private PaymentServiceImpl paymentService;

    @PostMapping("/create")
    public ResponseEntity<PaymentResponseDTO> createPayment(@RequestBody PaymentRequestDTO paymentRequestDTO) {
        PaymentResponseDTO paymentResponse = paymentService.createPayment(paymentRequestDTO);
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponseDTO> getPaymentById(@PathVariable Long paymentId) {
        PaymentResponseDTO paymentResponse = paymentService.getPaymentById(paymentId);
        return new ResponseEntity<>(paymentResponse, HttpStatus.OK);
    }
}
