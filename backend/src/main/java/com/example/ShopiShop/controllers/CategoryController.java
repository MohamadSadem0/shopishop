package com.example.ShopiShop.controllers;

import com.example.ShopiShop.servicesIMPL.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;
import com.example.ShopiShop.dto.request.CategoryRequestDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;


@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    // Get all categories
    @GetMapping("/public/allCategories")
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // Create a category within a specified section by section ID
    @PostMapping("/admin/category/create/{sectionId}")
    public ResponseEntity<CategoryResponseDTO> createCategory(
            @PathVariable UUID sectionId,
            @RequestBody CategoryRequestDTO categoryRequest) {
        return ResponseEntity.ok(categoryService.createCategory(sectionId, categoryRequest));
    }

    @GetMapping("/merchant/{storeId}/categories")
    public ResponseEntity<List<CategoryResponseDTO>> getCategoriesBySectionId(@PathVariable Long storeId) {
        return ResponseEntity.ok(categoryService.getCategoriesByStoreId(storeId));
    }

    // Update a category
    @PutMapping("/admin/category/update/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(
            @PathVariable UUID id,
            @RequestBody CategoryRequestDTO categoryRequest) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryRequest));
    }

    // Delete a category
    @DeleteMapping("/admin/category/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
