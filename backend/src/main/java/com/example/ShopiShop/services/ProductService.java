package com.example.ShopiShop.services;

import com.example.ShopiShop.models.dto.ProductRequestDTO;
import com.example.ShopiShop.models.dto.ProductResponseDTO;
import com.example.ShopiShop.models.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequestDTO productRequestDTO);

    public List<ProductResponseDTO> getProductsByStoreId(Long storeId);



    // Add more methods if needed, like findProduct, deleteProduct, etc.
}
