
package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.response.ProductResponseDTO;
import com.example.ShopiShop.servicesIMPL.ProductServiceImpl;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;




@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl productService;

    // Get all products
    @GetMapping("/public/AllProducts")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Get a specific product by its ID
    @GetMapping("/public/product/{productId}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID productId) {
        ProductResponseDTO product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    // Get all products for a specific category
    @GetMapping("/public/product/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategory(@PathVariable UUID categoryId) {
        List<ProductResponseDTO> products = productService.getProductsByCategoryId(categoryId);
        return ResponseEntity.ok(products);
    }

    // Get all products for a specific store
    @GetMapping("/public/product/store/{storeId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByStoreId(@PathVariable Long storeId) {
        List<ProductResponseDTO> products = productService.getProductsByStoreId(storeId);
        return ResponseEntity.ok(products);
    }


    @PostMapping("/merchant/{categoryid}/product/create")
    public ResponseEntity<ProductResponseDTO> createProduct(@PathVariable UUID categoryid, @RequestBody ProductRequestDTO product) {
       ProductResponseDTO savedProduct= productService.createProduct(product,categoryid);
        return ResponseEntity.ok(savedProduct);
    }
    // Delete a product by ID
    @DeleteMapping("/merchant/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable UUID productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }
    // Update a product
    @PutMapping("/merchant/{categoryId}/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable UUID productId,@PathVariable UUID categoryId, @RequestBody ProductRequestDTO productRequestDTO ) {
        ProductResponseDTO updatedProduct = productService.updateProduct(productId, productRequestDTO,categoryId);
        return ResponseEntity.ok(updatedProduct);
    }

}
