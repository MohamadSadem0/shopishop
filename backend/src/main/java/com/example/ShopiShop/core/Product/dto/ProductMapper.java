package com.example.ShopiShop.core.Product.dto;

import com.example.ShopiShop.core.Product.model.Product;
import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.modules.Category.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;


@Component
public class ProductMapper {

    // Method to map ProductRequestDTO to Product entity
    public Product toProduct(ProductRequestDTO productRequestDTO, Store store, Category category) {
        return Product.builder()
                .name(productRequestDTO.getName())
                .description(productRequestDTO.getDescription())
                .price(productRequestDTO.getPrice())
                .imageUrl(productRequestDTO.getImageUrl())
                .store(store)       // Associate store with the product
                .category(category) // Associate category with the product
                .build();
    }

    // Method to map Product entity to ProductRequestDTO


    public ProductRequestDTO toDTO(Product product) {
        return ProductRequestDTO.builder()
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .storeId(product.getStore().getId())       // Store ID extracted
                .categoryId(product.getCategory().getId().toString()) // Category ID extracted
                .build();
    }
}
