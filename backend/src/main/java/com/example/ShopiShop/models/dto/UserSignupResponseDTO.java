package com.example.ShopiShop.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupResponseDTO {
    private String message;
    private String userId;
}
