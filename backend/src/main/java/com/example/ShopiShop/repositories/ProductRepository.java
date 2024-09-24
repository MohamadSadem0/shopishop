package com.example.ShopiShop.core.Product.repository;

import com.example.ShopiShop.core.Product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByStoreId(Long storeId);

    List<Product> findByCategoryId(UUID categoryId);
}