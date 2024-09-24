package com.example.ShopiShop.modules.Section.controller;

import com.example.ShopiShop.core.Product.dto.ProductRequestDTO;
import com.example.ShopiShop.core.Product.model.Product;
import com.example.ShopiShop.core.Product.service.ProductService;
import com.example.ShopiShop.core.Product.service.ProductServiceImpl;
import com.example.ShopiShop.modules.Category.service.CategoryServiceImpl;
import com.example.ShopiShop.modules.Section.model.Section;
import com.example.ShopiShop.modules.Section.service.SectionService;
import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.service.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sections")
@RequiredArgsConstructor
public class SectionController {

    private final SectionService sectionService;
    private final CategoryServiceImpl categoryService;
    private final ProductServiceImpl productService;

    // Get all sections
    @GetMapping
    public ResponseEntity<List<Section>> getAllSections() {
        List<Section> sections = sectionService.getAllSections();
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
    @GetMapping("/{sectionId}/categories")
    public ResponseEntity<List<Category>> getCategoriesBySection(@PathVariable UUID sectionId) {
        Section section = sectionService.getSectionById(sectionId);
        return ResponseEntity.ok(section.getCategories());
    }

    // Add a product to a category
    @PostMapping("/categories/{categoryId}/products")
    public ResponseEntity<Product> createProduct(@PathVariable UUID categoryId, @RequestBody ProductRequestDTO product) {
        Product savedProduct = productService.createProduct( product);
        return ResponseEntity.ok(savedProduct);
    }

    // Get all products in a category
//    @GetMapping("/categories/{categoryId}/products")
//    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable UUID categoryId) {
//        List<Product> products = productService.getProductsByCategoryId(categoryId);
//        return ResponseEntity.ok(products);
//    }
}
