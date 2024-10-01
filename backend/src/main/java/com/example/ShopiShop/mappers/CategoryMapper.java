package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.CategoryRequestDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.models.Section;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CategoryMapper {

    // Convert Category entity to CategoryResponseDTO using builder
    public CategoryResponseDTO toResponseDTO(Category category) {
        if (category == null) {
            return null;
        }

        return CategoryResponseDTO.builder()
                .id(category.getId().toString())
                .name(category.getName())
                .imageUrl(category.getImageUrl())
                .sectionName(category.getSection() != null ? category.getSection().getName() : null)
                .build();
    }

    // Convert CategoryRequestDTO to Category entity using builder
    public Category toEntity(CategoryRequestDTO dto, Section section) {
        if (dto == null) {
            return null;
        }

        return Category.builder()
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .section(section)
                .build();
    }
}
