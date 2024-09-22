package com.example.ShopiShop.modules.Section.repository;

import com.example.ShopiShop.modules.Section.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SectionRepository extends JpaRepository<Section, UUID> {
    Optional<Section> findByName(String name);
}

