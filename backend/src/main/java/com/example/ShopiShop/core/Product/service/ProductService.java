package com.example.ShopiShop.core.Product.service;

import com.example.ShopiShop.core.Product.dto.ProductRequestDTO;
import com.example.ShopiShop.core.Product.model.Product;

public interface ProductService {
    Product createProduct(ProductRequestDTO productRequestDTO);
    // Add more methods if needed, like findProduct, deleteProduct, etc.
}
