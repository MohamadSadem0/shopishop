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

    // Location fields
    private Double latitude;
    private Double longitude;
    private String addressLine;
    private String city;
    private String state;
    private String zipCode;
    private String country;

    // Business-specific fields (for merchants)
    private String businessName;  // Optional for merchants
    private String location;      // Optional for merchants (physical store location)
}
