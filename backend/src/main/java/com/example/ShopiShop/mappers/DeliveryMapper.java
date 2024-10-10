package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.response.DeliveryResponseDTO;
import com.example.ShopiShop.models.Delivery;
import org.springframework.stereotype.Component;

@Component
public class DeliveryMapper {

    public DeliveryResponseDTO toDeliveryResponse(Delivery delivery) {
        return DeliveryResponseDTO.builder()
                .id(delivery.getId())
                .locationId(delivery.getDeliveryAddress().getId())
                .deliveryStatus(delivery.getDeliveryStatus())
                .deliveryDate(delivery.getDeliveryDate())
                .build();
    }
}
