package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.response.ProductResponseDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.models.Category;
import org.springframework.stereotype.Component;


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

    // Method to map Product entity to ProductResponseDTO
    public ProductResponseDTO toResponseDTO(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription()
        );
    }
}
