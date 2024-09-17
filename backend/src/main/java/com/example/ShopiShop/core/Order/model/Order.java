package com.example.ShopiShop.core.Order.model;

import com.example.ShopiShop.core.User.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "customer_order")

public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

@ManyToOne
    private User user;
}


//. Order
//Attributes:
//id: Long
//user: User (Many-to-One)
//totalAmount: BigDecimal
//orderDate: LocalDateTime
//status: OrderStatusEnum (e.g., PENDING, COMPLETED, CANCELLED)
//payments: List<Payment> (One-to-Many)
//delivery: Delivery (One-to-One)
//shoppingHistory: ShoppingHistory (One-to-One)