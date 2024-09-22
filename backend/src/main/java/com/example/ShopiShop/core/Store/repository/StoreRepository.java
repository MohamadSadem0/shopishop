package com.example.ShopiShop.core.Store.repository;

import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.core.User.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface StoreRepository extends JpaRepository<Store,Long>{
    Optional<Store> findByOwnerEmail(String email); // Assuming "owner" is the User associated with the store

}
