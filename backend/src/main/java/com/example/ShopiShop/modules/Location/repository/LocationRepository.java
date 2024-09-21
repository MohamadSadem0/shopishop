package com.example.ShopiShop.modules.Location.repository;

import com.example.ShopiShop.modules.Location.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location , Long> {
}
