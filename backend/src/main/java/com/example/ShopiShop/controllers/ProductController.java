//package com.example.ShopiShop.core.Product.controller;
//
//import com.example.ShopiShop.models.Product;
//import com.example.ShopiShop.repositories.ProductRepository;
//import com.example.ShopiShop.models.Category;
//import com.example.ShopiShop.repositories.CategoryRepository;
//import com.example.ShopiShop.models.Store;
//import com.example.ShopiShop.repositories.StoreRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/merchant/products")
//@RequiredArgsConstructor
//public class ProductController {
//
//    private final ProductRepository productRepository;
//    private final StoreRepository storeRepository;
//    private final CategoryRepository categoryRepository;
//
//    // Create a new product
//    @PostMapping
//    public ResponseEntity<Product> createProduct(@RequestParam Long storeId, @RequestParam UUID categoryId, @RequestBody Product product) {
//        Store store = storeRepository.findById(storeId).orElseThrow(() -> new IllegalArgumentException("Store not found"));
//        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("Category not found"));
//
//        product.setStore(store);
//        product.setCategory(category);
//
//        Product savedProduct = productRepository.save(product);
//        return ResponseEntity.ok(savedProduct);
//    }
//}


package com.example.ShopiShop.controllers;

import com.example.ShopiShop.models.dto.ProductMapper;
import com.example.ShopiShop.models.dto.ProductRequestDTO;
import com.example.ShopiShop.models.dto.ProductResponseDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.repositories.ProductRepository;
import com.example.ShopiShop.services.IMPL.ProductServiceImpl;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.repositories.CategoryRepository;
import com.example.ShopiShop.repositories.StoreRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;



@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // Allow requests from your frontend origin
@RestController
@RequestMapping("/api/merchant/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;



private final ProductServiceImpl productService;

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        Product createdProduct = productService.createProduct(productRequestDTO);
        return new ResponseEntity<>("product created successfully \n" +createdProduct.getId().toString(), HttpStatus.CREATED);
    }
    // Get all products for a specific category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        List<Product> products = category.getProducts(); // Assuming there's a products field in Category
        return ResponseEntity.ok(products);
    }

    // Get a specific product by its ID
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        return ResponseEntity.ok(product);
    }

    // Delete a product by ID
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        productRepository.delete(product);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByStoreId(@PathVariable Long storeId) {
        List<ProductResponseDTO> products = productService.getProductsByStoreId(storeId);
        return ResponseEntity.ok(products);
    }
}
