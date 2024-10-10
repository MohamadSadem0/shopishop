package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.DeliveryRequestDTO;
import com.example.ShopiShop.dto.response.DeliveryResponseDTO;
import com.example.ShopiShop.servicesIMPL.DeliveryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryServiceImpl deliveryService;

    @PostMapping("/create")
    public ResponseEntity<DeliveryResponseDTO> createDelivery(@RequestBody DeliveryRequestDTO deliveryRequestDTO) {
        DeliveryResponseDTO deliveryResponse = deliveryService.createDelivery(deliveryRequestDTO);
        return new ResponseEntity<>(deliveryResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{deliveryId}")
    public ResponseEntity<DeliveryResponseDTO> getDeliveryById(@PathVariable Long deliveryId) {
        DeliveryResponseDTO deliveryResponse = deliveryService.getDeliveryById(deliveryId);
        return new ResponseEntity<>(deliveryResponse, HttpStatus.OK);
    }
}
