package com.example.ShopiShop.modules.Category.service;

import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
import com.example.ShopiShop.modules.Category.service.CategoryService;
import com.example.ShopiShop.modules.Section.model.Section;
import com.example.ShopiShop.modules.Section.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final SectionRepository sectionRepository;

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
    public void deleteCategory(UUID id) {
        categoryRepository.deleteById(id);
    }
}
