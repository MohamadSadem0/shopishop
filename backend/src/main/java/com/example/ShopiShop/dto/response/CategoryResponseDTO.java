package com.example.ShopiShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponseDTO {
    private String id;
    private String name;
    private String imageUrl;
    private String sectionName; // Only reference the section name, no recursion
}
