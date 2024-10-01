package com.example.ShopiShop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductRequestDTO {

    // Product basic details
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;

    // Store and category IDs for associations
    private Long storeId;
}