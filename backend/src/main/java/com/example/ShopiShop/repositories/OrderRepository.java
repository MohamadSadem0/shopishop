package com.example.ShopiShop.repositories;

import com.example.ShopiShop.models.Order;
import com.example.ShopiShop.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
