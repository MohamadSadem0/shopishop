package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.response.SectionResponseDTO;
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
