package com.example.ShopiShop.core.User.dto;


import com.example.ShopiShop.core.User.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserSignupRequestDTO dto) {
        return User.builder()
                .userName(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())  // Encoding handled in the service
                .userRole(dto.getRole())
                .build();
    }

    public UserSignupResponseDTO toSignupResponse(User user, String message) {
        return new UserSignupResponseDTO(message, String.valueOf(user.getId()));
    }
}
