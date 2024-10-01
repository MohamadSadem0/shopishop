package com.example.ShopiShop.services;

import com.example.ShopiShop.dto.request.CategoryRequestDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.models.Section;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    CategoryResponseDTO createCategory(UUID sectionId, CategoryRequestDTO categoryRequest);
    List<CategoryResponseDTO> getAllCategories();
    CategoryResponseDTO getCategoryById(UUID id);
    void deleteCategory(UUID id);
    List<CategoryResponseDTO> getCategoriesBySectionId(UUID sectionId);
    List<CategoryResponseDTO> getCategoriesBySection(Section section);

    // Update method signature
    CategoryResponseDTO updateCategory(UUID id, CategoryRequestDTO categoryRequest);
    List<CategoryResponseDTO> getCategoriesByStoreId(Long storeId);

}
