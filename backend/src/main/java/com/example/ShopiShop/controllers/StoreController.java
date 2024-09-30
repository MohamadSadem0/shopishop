package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.services.CategoryService;
import com.example.ShopiShop.servicesIMPL.StoreServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/merchant/stores")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class StoreController {

    private final StoreServiceImpl storeService;
    private final CategoryService categoryService;

    // Get categories by store ID based on the section associated with the store
    @GetMapping("/{storeId}/section-categories")
    public ResponseEntity<List<CategoryResponseDTO>> getCategoriesByStoreSection(@PathVariable Long storeId) {
        // Step 1: Fetch the store by store ID
        Store store = storeService.getStoreById(storeId);

        if (store == null || store.getSection() == null) {
            return ResponseEntity.badRequest().body(null); // Return a 400 if the store or section is not found
        }

        // Step 2: Fetch the categories associated with the section using DTO
        List<CategoryResponseDTO> categories = categoryService.getCategoriesBySection(store.getSection());

        return ResponseEntity.ok(categories);
    }
}
