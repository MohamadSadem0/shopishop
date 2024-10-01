package com.example.ShopiShop.mappers;


import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.dto.response.UserResponseDTO;
import com.example.ShopiShop.dto.response.UserSignupResponseDTO;
import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserSignupRequestDTO dto) {
        return User.builder()
                .userName(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .userRole(dto.getRole())
                .build();
    }

    public UserSignupResponseDTO toSignupResponse(User user, String message) {
        return new UserSignupResponseDTO(message, String.valueOf(user.getId()));
    }
    public static UserResponseDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        // Map user entity to UserResponseDTO
        return UserResponseDTO.builder()
                .id(user.getId())
                .userName(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getUserRole().name())
                .location(buildLocationDTO(user.getLocation()))
                .build();
    }

    private static UserResponseDTO.LocationDTO buildLocationDTO(Location location) {
        if (location == null) {
            return null;
        }
        return UserResponseDTO.LocationDTO.builder()
                .addressLine(location.getAddressLine())
                .city(location.getCity())
                .state(location.getState())
                .zipCode(location.getZipCode())
                .country(location.getCountry())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .build();
    }
}
