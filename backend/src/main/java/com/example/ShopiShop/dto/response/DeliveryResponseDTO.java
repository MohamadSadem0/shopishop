package com.example.ShopiShop.dto.response;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeliveryResponseDTO {
    private Long id;
    private Long locationId;  // Delivery address ID
    private String deliveryStatus;
    private Date deliveryDate;
}
