package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.DeliveryRequestDTO;
import com.example.ShopiShop.dto.response.DeliveryResponseDTO;
import com.example.ShopiShop.exceptions.EntityNotFoundException;
import com.example.ShopiShop.mappers.DeliveryMapper;
import com.example.ShopiShop.models.*;
import com.example.ShopiShop.repositories.DeliveryRepository;

import com.example.ShopiShop.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DeliveryServiceImpl {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private LocationRepository locationRepository;


    @Autowired
    private DeliveryMapper deliveryMapper;

    public DeliveryResponseDTO createDelivery(DeliveryRequestDTO deliveryRequestDTO) {
        Location location = locationRepository.findById(deliveryRequestDTO.getLocationId())
                .orElseThrow(() -> new EntityNotFoundException("Location not found"));

        Delivery delivery = Delivery.builder()
                .deliveryDate(deliveryRequestDTO.getDeliveryDate())
                .deliveryAddress(location)
                .deliveryStatus("PENDING")
                .build();

        deliveryRepository.save(delivery);

        return DeliveryResponseDTO.builder()
                .id(delivery.getId())
                .locationId(location.getId())
                .deliveryDate(delivery.getDeliveryDate())
                .deliveryStatus(delivery.getDeliveryStatus())
                .build();
    }

    public DeliveryResponseDTO getDeliveryById(Long deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new EntityNotFoundException("Delivery not found"));
        return deliveryMapper.toDeliveryResponse(delivery);
    }
}
