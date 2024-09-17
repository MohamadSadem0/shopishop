package com.example.ShopiShop.core.User.dto;

import com.example.ShopiShop.enums.UserRoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequestDTO {
    private String name;
    private String email;
    private String password;
    private UserRoleEnum role;
}
