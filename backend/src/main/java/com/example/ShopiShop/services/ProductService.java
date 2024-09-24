package com.example.ShopiShop.core.Product.service;

import com.example.ShopiShop.core.Product.dto.ProductRequestDTO;
import com.example.ShopiShop.core.Product.dto.ProductResponseDTO;
import com.example.ShopiShop.models.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequestDTO productRequestDTO);

    public List<ProductResponseDTO> getProductsByStoreId(Long storeId);



    // Add more methods if needed, like findProduct, deleteProduct, etc.
}
