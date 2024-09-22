package com.example.ShopiShop.core.Product.service;

import com.example.ShopiShop.core.Product.dto.ProductMapper;
import com.example.ShopiShop.core.Product.dto.ProductRequestDTO;
import com.example.ShopiShop.core.Product.model.Product;
import com.example.ShopiShop.core.Product.repository.ProductRepository;
import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.core.Store.repository.StoreRepository;
import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public UUID convertToUUID(String hexString) {
        // Remove the "0x" prefix if it exists
        if (hexString.startsWith("0x")) {
            hexString = hexString.substring(2);
        }

        // Reformat the string to match the UUID format
        String formattedUUID = hexString.replaceFirst(
                "(\\w{8})(\\w{4})(\\w{4})(\\w{4})(\\w+)",
                "$1-$2-$3-$4-$5"
        );

        // Convert to UUID
        return UUID.fromString(formattedUUID);
    }

    @Override
    public Product createProduct(ProductRequestDTO productRequestDTO) {
        // Fetch the Store and Category by their IDs from the request DTO
        Store store = storeRepository.findById(productRequestDTO.getStoreId())
                .orElseThrow(() -> new RuntimeException("Store not found"));
        Category category = categoryRepository.findById(convertToUUID(productRequestDTO.getCategoryId()))
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Map DTO to entity
        Product product = productMapper.toProduct(productRequestDTO, store, category);

        // Save and return the product
        return productRepository.save(product);
    }
}
