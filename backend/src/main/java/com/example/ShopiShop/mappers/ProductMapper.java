package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.response.ProductResponseDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.models.Category;
import org.springframework.stereotype.Component;

import java.security.Timestamp;

@Component
public class ProductMapper {

    public Product toProduct(ProductRequestDTO productRequestDTO, Store store, Category category) {

        return Product.builder()
                .name(productRequestDTO.getName())
                .description(productRequestDTO.getDescription())
                .price(productRequestDTO.getPrice())
                .imageUrl(productRequestDTO.getImageUrl())
                .store(store)
                .category(category)
                .isAvailable(productRequestDTO.getIsAvailable())
                .build();
    }

    public ProductResponseDTO toResponseDTO(Product product, String sectionName, String categoryName) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                sectionName,
                categoryName,
                product.getImageUrl(),
                product.getIsAvailable()
        );
    }
}
