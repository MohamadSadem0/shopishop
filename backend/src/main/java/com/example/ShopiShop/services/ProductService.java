package com.example.ShopiShop.services;

import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.response.ProductResponseDTO;
import com.example.ShopiShop.models.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequestDTO productRequestDTO);

    public List<ProductResponseDTO> getProductsByStoreId(Long storeId);



    // Add more methods if needed, like findProduct, deleteProduct, etc.
}
