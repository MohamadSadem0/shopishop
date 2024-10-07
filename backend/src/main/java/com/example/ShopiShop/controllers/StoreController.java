package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.StoreMapper;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.dto.response.StoreResponseDTO;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.services.CategoryService;
import com.example.ShopiShop.servicesIMPL.StoreServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class StoreController {

    private final StoreServiceImpl storeService;
    private final CategoryService categoryService;
    private StoreMapper storeMapper;

    // Get categories by store ID based on the section associated with the store
    @GetMapping("/{storeId}/section-categories")
    public ResponseEntity<List<CategoryResponseDTO>> getCategoriesByStoreSection(@PathVariable Long storeId) {
        // Step 1: Fetch the store by store ID
        Store store = storeService.getStoreById(storeId);

        if (store == null || store.getSection() == null) {
            return ResponseEntity.badRequest().body(null); // Return a 400 if the store or section is not found
        }

        // Step 2: Fetch the categories associated with the section using DTOz
        List<CategoryResponseDTO> categories = categoryService.getCategoriesBySection(store.getSection());

        return ResponseEntity.ok(categories);
    }

    @GetMapping("public/stores/all")
    public ResponseEntity<List<StoreResponseDTO>> getAllStores(){
    return new ResponseEntity<>(storeService.getAllStores(), HttpStatus.OK);
    }    @GetMapping("public/stores/{id}")
    public ResponseEntity<StoreResponseDTO> getById(@PathVariable Long id){
    return new ResponseEntity<>(StoreMapper.toDTO(storeService.getStoreById(id)), HttpStatus.OK);
    }

    //todo:delete this api
    @GetMapping("delete-all")
    public ResponseEntity<String> deleteAllStores(){
        storeService.deleteAllStores();
        return new ResponseEntity<>("all stores deleted", HttpStatus.OK);

    }

    @PostMapping("admin/approve")
    public ResponseEntity<String> approveStore(@RequestParam Long storeId) {

        return ResponseEntity.ok(storeService.approveStore(storeId));
    }
}
