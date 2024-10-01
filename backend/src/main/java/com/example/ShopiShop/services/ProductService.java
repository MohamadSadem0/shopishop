package com.example.ShopiShop.services;

import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.response.ProductResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO ,UUID CategoryId);

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO getProductById(UUID productId);

    List<ProductResponseDTO> getProductsByCategoryId(UUID categoryId);

    List<ProductResponseDTO> getProductsByStoreId(Long storeId);

    void deleteProduct(UUID productId);

    ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO productRequestDTO,UUID categoryId);
}
