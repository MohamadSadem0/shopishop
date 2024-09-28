package com.example.ShopiShop.controllers;

import com.example.ShopiShop.models.dto.ProductRequestDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.models.dto.SectionResponseDTO;
import com.example.ShopiShop.services.IMPL.ProductServiceImpl;
import com.example.ShopiShop.services.IMPL.CategoryServiceImpl;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.services.IMPL.SectionServiceImpl;
import com.example.ShopiShop.services.SectionService;
import com.example.ShopiShop.models.Category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "https://dry-temple-95599-6b8f54712ec8.herokuapp.com", allowCredentials = "true")  // Allow requests from your frontend origin
@RequestMapping("/api/sections")
@RequiredArgsConstructor
public class SectionController {

    private final SectionServiceImpl sectionService;
    private final CategoryServiceImpl categoryService;
    private final ProductServiceImpl productService;

    // Get all sections
    @GetMapping
    public ResponseEntity<List<SectionResponseDTO>> getAllSections() {
        List<SectionResponseDTO> sections = sectionService.getAllSections();
        return ResponseEntity.ok(sections);
    }

    // Get section by ID
    @GetMapping("/{id}")
    public ResponseEntity<Section> getSectionById(@PathVariable UUID id) {
        Section section = sectionService.getSectionById(id);
        return ResponseEntity.ok(section);
    }

    // Add a category to a section
    @PostMapping("/{sectionId}/categories")
    public ResponseEntity<Category> createCategory(@PathVariable UUID sectionId, @RequestBody Category category) {
        Category savedCategory = categoryService.createCategory(sectionId, category);
        return ResponseEntity.ok(savedCategory);
    }

    // Get all categories in a section

    // Add a product to a category
    @PostMapping("/categories/{categoryId}/products")
    public ResponseEntity<Product> createProduct(@PathVariable UUID categoryId, @RequestBody ProductRequestDTO product) {
        Product savedProduct = productService.createProduct( product);
        return ResponseEntity.ok(savedProduct);
    }


}
