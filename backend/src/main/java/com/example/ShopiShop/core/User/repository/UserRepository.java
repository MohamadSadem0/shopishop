package com.example.ShopiShop.core.User.repository;

import com.example.ShopiShop.core.User.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
}
