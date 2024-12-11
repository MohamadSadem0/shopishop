package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.mappers.ProductMapper;
import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.response.ProductResponseDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.repositories.ProductRepository;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.repositories.CategoryRepository;
import com.example.ShopiShop.services.ProductService;
import com.example.ShopiShop.exceptions.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO, UUID categoryId) {
        Store store = getStoreById(productRequestDTO.getStoreId());
        Category category = getCategoryById(categoryId);

        Product product = productMapper.toProduct(productRequestDTO, store, category);
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponseDTO(savedProduct, store.getName(), category.getName());
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> productMapper.toResponseDTO(product, product.getStore().getSection().getName(), product.getCategory().getName()))
                .collect(Collectors.toList());
    }
    public List<ProductResponseDTO> getProductsBySectionId(UUID sectionId) {
        // Fetch all categories associated with the section
        List<Category> categories = categoryRepository.findAllBySectionId(sectionId);

        // Collect all products from these categories
        List<Product> products = categories.stream()
                .flatMap(category -> category.getProducts().stream())
                .collect(Collectors.toList());

        // Convert products to ProductResponseDTO
        return products.stream()
                .map(product -> productMapper.toResponseDTO(product, product.getCategory().getSection().getName(), product.getCategory().getName()))
                .collect(Collectors.toList());
    }
    @Override
    public ProductResponseDTO getProductById(UUID productId) {
        Product product = getProductByIdInternal(productId);
        return productMapper.toResponseDTO(product, product.getStore().getName(), product.getCategory().getName());
    }

    @Override
    public List<ProductResponseDTO> getProductsByCategoryId(UUID categoryId) {
        Category category = getCategoryById(categoryId);
        return category.getProducts().stream()
                .map(product -> productMapper.toResponseDTO(product, product.getStore().getName(), category.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDTO> getProductsByStoreId(Long storeId) {
        Store store = getStoreById(storeId);
        return productRepository.findByStoreId(storeId).stream()
                .map(product -> productMapper.toResponseDTO(product, store.getName(), product.getCategory().getName()))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(UUID productId) {
        Product product = getProductByIdInternal(productId);
        productRepository.delete(product);
    }

    @Override
    public ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO productRequestDTO, UUID categoryId) {
        Product product = getProductByIdInternal(productId);

        // Update product fields
        product.setName(productRequestDTO.getName());
        product.setDescription(productRequestDTO.getDescription());
        product.setPrice(productRequestDTO.getPrice());
        product.setImageUrl(productRequestDTO.getImageUrl());

        // Update store and category if provided
        if (productRequestDTO.getStoreId() != null) {
            Store store = getStoreById(productRequestDTO.getStoreId());
            product.setStore(store);
        }
        if (categoryId != null) {
            Category category = getCategoryById(categoryId);
            product.setCategory(category);
        }

        Product updatedProduct = productRepository.save(product);
        return productMapper.toResponseDTO(updatedProduct, updatedProduct.getStore().getName(), updatedProduct.getCategory().getName());
    }

    private Product getProductByIdInternal(UUID productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    private Store getStoreById(Long storeId) {
        return storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Store not found"));
    }

    private Category getCategoryById(UUID categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }
    public boolean changeProductAvailability(UUID productId, Boolean isAvailable) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Product updatedProduct = product.get();
            updatedProduct.setIsAvailable(isAvailable);
            productRepository.save(updatedProduct);
            return true;
        }
        return false;
    }
}
