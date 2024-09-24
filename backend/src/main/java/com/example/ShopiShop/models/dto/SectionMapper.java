package com.example.ShopiShop.models.dto;

import com.example.ShopiShop.models.Section;
import org.springframework.stereotype.Component;


@Component
public class SectionMapper {

    public SectionResponseDTO mapToSectionResponse(Section section) {
        return SectionResponseDTO.builder()
                .name(section.getName())
                .url(section.getImageUrl())
                .build();
    }
}
