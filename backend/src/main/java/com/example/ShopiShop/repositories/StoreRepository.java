package com.example.ShopiShop.repositories;

import com.example.ShopiShop.models.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface StoreRepository extends JpaRepository<Store,Long>{
    Optional<Store> findByOwnerEmail(String email); // Assuming "owner" is the User associated with the store


}
