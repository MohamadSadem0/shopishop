package com.example.ShopiShop.models.dto;


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
}
