package com.example.ShopiShop.mappers;


import com.example.ShopiShop.models.dto.UserLoginResponseDTO;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.models.Location;

public class UserLoginResponseMapper {

    public static UserLoginResponseDTO toDto(User user, String token, String storeId) {
        return UserLoginResponseDTO.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getUserRole())
                .userName(user.getUsername())
                .phoneNumber(user.getPhoneNumber())
                .location(toLocationDTO(user.getLocation())) // Mapping Location
                .storeId(storeId)
                .build();
    }

    private static UserLoginResponseDTO.LocationDTO toLocationDTO(Location location) {
        if (location == null) {
            return null; // Handle if location is null
        }

        return new UserLoginResponseDTO.LocationDTO(
                location.getAddressLine(),
                location.getCity(),
                location.getState(),
                location.getZipCode(),
                location.getCountry(),
                location.getLatitude(),
                location.getLongitude()
        );
    }
}
