package com.example.ShopiShop.core.Store.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreRequestDTO {

    private String name; // Store name
    private Long ownerId; // ID of the store's owner
    private String addressLine; // Address information
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private Double latitude;
    private Double longitude;
}
