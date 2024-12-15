package com.example.ShopiShop.controllers;

import com.example.ShopiShop.servicesIMPL.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;
import com.example.ShopiShop.dto.request.CategoryRequestDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.exceptions.EntityNotFoundException;



@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class    CategoryController {

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

    @GetMapping("/public/{sectionId}/categories")
    public ResponseEntity<List<CategoryResponseDTO>> getCategoriesBySectionId(@PathVariable Long sectionId) {
        return ResponseEntity.ok(categoryService.getCategoriesByStoreId(sectionId));
    }

    // Update a category
    @PutMapping("/admin/category/update/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(
            @PathVariable UUID id,
            @RequestBody CategoryRequestDTO categoryRequest) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryRequest));
    }

    @DeleteMapping("/admin/category/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable UUID id) {
        try {
            categoryService.deleteCategory(id);
//            return ResponseEntity.ok("Category deleted successfully.");
            return new ResponseEntity<>("category deleted successfully ", HttpStatus.NO_CONTENT);

        } catch (EntityNotFoundException ex) {
            throw new EntityNotFoundException("Category not found.");
        }
    }

}
