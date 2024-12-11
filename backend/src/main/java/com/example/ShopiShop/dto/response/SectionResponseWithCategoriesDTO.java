package com.example.ShopiShop.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SectionResponseWithCategoriesDTO {
    private UUID sectionId;
    private String sectionName;
    private List<CategoryResponseDTO> categories;  // A list of category response DTOs

    // Getters and setters

}
