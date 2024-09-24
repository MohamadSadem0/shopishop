package com.example.ShopiShop.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginResponseDTO {
    private String token;
    private String email;
    private String role;
    private String userName;
    private String phoneNumber; // New field for the phone number
    private LocationDTO location; // New field for the location details

    @Data
    @AllArgsConstructor
    public static class LocationDTO {
        private String addressLine;
        private String city;
        private String state;
        private String zipCode;
        private String country;
        private Double latitude;
        private Double longitude;
    }
}
