package com.example.ShopiShop.modules.Section.dto;

import com.example.ShopiShop.modules.Section.model.Section;
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
