package com.example.ShopiShop.dto.response;

import com.example.ShopiShop.enums.UserRoleEnum;
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
    private UserRoleEnum role;
    private String userName;
    private String phoneNumber; // New field for the phone number
    private LocationDTO location; // New field for the location details
    private StoreResponseDTO store;
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
