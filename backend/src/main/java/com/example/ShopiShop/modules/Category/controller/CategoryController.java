package com.example.ShopiShop.modules.Category.controller;

import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
import com.example.ShopiShop.modules.Section.model.Section;
import com.example.ShopiShop.modules.Section.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final SectionRepository sectionRepository;

    // Get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    // Get categories by section name
    @GetMapping("/section/{sectionName}")
    public ResponseEntity<List<Category>> getCategoriesBySection(@PathVariable String sectionName) {
        Section section = sectionRepository.findByName(sectionName)
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));

        List<Category> categories = section.getCategories();
        return ResponseEntity.ok(categories);
    }
}