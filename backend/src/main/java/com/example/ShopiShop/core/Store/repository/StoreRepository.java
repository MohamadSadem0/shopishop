package com.example.ShopiShop.core.Store.repository;

import com.example.ShopiShop.core.Store.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface StoreRepository extends JpaRepository<Store,Long>{
}
