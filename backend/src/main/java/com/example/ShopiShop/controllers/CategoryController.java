package com.example.ShopiShop.controllers;

import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.repositories.CategoryRepository;
import com.example.ShopiShop.services.IMPL.CategoryServiceImpl;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.services.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/categories")
@CrossOrigin(origins = "https://dry-temple-95599-6b8f54712ec8.herokuapp.com", allowCredentials = "true")  // Allow requests from your frontend origin
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final SectionRepository sectionRepository;
    private final CategoryServiceImpl categoryService;
    private final SectionService sectionService;


    // Get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    // Create a category with a specified section
    @PostMapping("/section/{sectionId}")
    @PreAuthorize("hasRole('MERCHANT')")
    public ResponseEntity<Category> createCategory(@PathVariable UUID sectionId, @RequestBody Category category) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));

        // Set the section for the category
        category.setSection(section);

        // Save the category
        Category savedCategory = categoryService.createCategory(sectionId,category);
        return ResponseEntity.ok(savedCategory);
    }

    // Get categories by section name
    @GetMapping("/section/{sectionName}")
    public ResponseEntity<List<Category>> getCategoriesBySection(@PathVariable String sectionName) {
        Section section = sectionRepository.findByName(sectionName)
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));

        List<Category> categories = section.getCategories();
        return ResponseEntity.ok(categories);
    }


    @GetMapping("/{sectionId}/categories")
    public ResponseEntity<List<Category>> getCategoriesBySection(@PathVariable UUID sectionId) {
        Section section = sectionService.getSectionById(sectionId);
        return ResponseEntity.ok(section.getCategories());
    }

}