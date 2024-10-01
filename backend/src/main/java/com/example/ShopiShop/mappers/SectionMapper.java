package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.models.Section;
import org.springframework.stereotype.Component;

@Component
public class SectionMapper {

    public SectionResponseDTO toResponseDTO(Section section) {
        return SectionResponseDTO.builder()
                .id(section.getId())
                .name(section.getName())
                .url(section.getImageUrl())
                .build();
    }

    public Section toEntity(SectionRequestDTO sectionRequestDTO) {
        return Section.builder()
                .name(sectionRequestDTO.getName())
                .imageUrl(sectionRequestDTO.getImageUrl())
                .build();
    }
}
