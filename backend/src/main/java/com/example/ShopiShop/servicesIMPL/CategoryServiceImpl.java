package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.CategoryRepository;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final SectionRepository sectionRepository;
    final SectionRepository storeRepository;


    @Override
    public Category createCategory(UUID sectionId, Category category) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));
        category.setSection(section); // Set the section
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(UUID id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }
    @Override
    public List<CategoryResponseDTO> getCategoriesBySection(Section section) {
        List<Category> categories = categoryRepository.findBySection(section);

        // Convert Category entities to DTOs
        return categories.stream()
                .map(category -> new CategoryResponseDTO(
                        category.getId().toString(),
                        category.getName(),
                        category.getImageUrl(),
                        category.getSection().getName() // Only get the section name
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(UUID id) {
        categoryRepository.deleteById(id);
    }
}
