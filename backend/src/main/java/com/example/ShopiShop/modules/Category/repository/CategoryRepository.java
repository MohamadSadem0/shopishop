package com.example.ShopiShop.modules.Category.repository;


import com.example.ShopiShop.modules.Category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
