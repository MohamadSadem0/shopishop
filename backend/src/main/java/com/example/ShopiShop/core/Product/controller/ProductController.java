//package com.example.ShopiShop.core.Product.controller;
//
//import com.example.ShopiShop.core.Product.model.Product;
//import com.example.ShopiShop.core.Product.repository.ProductRepository;
//import com.example.ShopiShop.modules.Category.model.Category;
//import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
//import com.example.ShopiShop.core.Store.model.Store;
//import com.example.ShopiShop.core.Store.repository.StoreRepository;
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


package com.example.ShopiShop.core.Product.controller;

import com.example.ShopiShop.core.Product.dto.ProductMapper;
import com.example.ShopiShop.core.Product.dto.ProductRequestDTO;
import com.example.ShopiShop.core.Product.model.Product;
import com.example.ShopiShop.core.Product.repository.ProductRepository;
import com.example.ShopiShop.core.Product.service.ProductService;
import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.core.Store.repository.StoreRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/merchant/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;


    // Create a new product

//    @PostMapping
//    public ResponseEntity<Product> createProduct(
//
//            @RequestBody ProductRequestDTO product) {
//
//        // Fetch the store by ID and check if it exists
//        Store store = storeRepository.findById(product.getStoreId())
//                .orElseThrow(() -> new IllegalArgumentException("Store not found"));
//
//        // Fetch the category by ID and check if it exists
//        Category category = categoryRepository.findById(product.getCategoryId())
//                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
//
//        // Assign the fetched store and category to the product
////        product.setStore(store);
////        product.setCategory(category);
//
//        // Save the new product to the repository
//        Product savedProduct = productRepository.save(productMapper.toEntity(product,));
//
//        return ResponseEntity.ok(savedProduct);
//    }
private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        Product createdProduct = productService.createProduct(productRequestDTO);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
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
}
