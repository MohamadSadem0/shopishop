package com.example.ShopiShop.dto.request;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeliveryRequestDTO {
    private Long locationId;  // Delivery address ID
    private Date deliveryDate;
}
