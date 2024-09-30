package com.example.ShopiShop.dto.response;

import com.example.ShopiShop.models.Section;
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
