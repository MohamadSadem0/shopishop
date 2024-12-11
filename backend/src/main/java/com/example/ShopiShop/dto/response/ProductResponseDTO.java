package com.example.ShopiShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {

    private UUID id;
    private String name;
    private BigDecimal price;
    private String description;
    private String sectionName;
    private String CategoryName;
    private String ImageUrl;
    private Boolean isAvailable;
}

