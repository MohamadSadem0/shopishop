package com.example.ShopiShop.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class SectionResponseDTO {

    private String name;
    private String url;
}
