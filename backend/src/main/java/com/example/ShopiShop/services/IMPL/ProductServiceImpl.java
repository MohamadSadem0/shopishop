package com.example.ShopiShop.services.IMPL;

import com.example.ShopiShop.models.dto.ProductMapper;
import com.example.ShopiShop.models.dto.ProductRequestDTO;
import com.example.ShopiShop.models.dto.ProductResponseDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.repositories.ProductRepository;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.repositories.CategoryRepository;
import com.example.ShopiShop.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public List<ProductResponseDTO> getProductsByStoreId(Long storeId) {
        List<Product> products = productRepository.findByStoreId(storeId);
        return products.stream()
                .map(productMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

}
