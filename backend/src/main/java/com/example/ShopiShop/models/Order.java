package com.example.ShopiShop.models;

import com.example.ShopiShop.models.User;
import jakarta.persistence.*;
import lombok.*;

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