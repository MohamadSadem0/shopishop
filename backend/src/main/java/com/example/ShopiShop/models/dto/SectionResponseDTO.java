package com.example.ShopiShop.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
public class SectionResponseDTO {

    private UUID id;
    private String name;
    private String url;
}
