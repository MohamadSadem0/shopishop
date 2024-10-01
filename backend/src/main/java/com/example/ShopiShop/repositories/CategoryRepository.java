package com.example.ShopiShop.repositories;


import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.models.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface    CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findBySection(Section section);


}
