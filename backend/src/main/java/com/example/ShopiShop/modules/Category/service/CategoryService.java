package com.example.ShopiShop.modules.Category.service;

import com.example.ShopiShop.modules.Category.model.Category;
import java.util.List;
import java.util.UUID;

public interface CategoryService {
    Category createCategory( UUID sectionId, Category category);
    List<Category> getAllCategories();
    Category getCategoryById(UUID id);
    void deleteCategory(UUID id);
}