package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.dto.response.SectionResponseWithCategoriesDTO;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.models.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class SectionMapper {

    private final CategoryMapper categoryMapper;

    @Autowired
    public SectionMapper(CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

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

    public SectionResponseWithCategoriesDTO toSectionResponseWithCategoriesDTO(Section section) {
        return SectionResponseWithCategoriesDTO.builder()
                .sectionId(section.getId())
                .sectionName(section.getName())
                .categories(section.getCategories().stream()
                        .map(CategoryMapper::toResponseDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
