package com.example.ShopiShop.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // The user who added this item

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;  // The product being added to the cart

    private int quantity;  // The quantity of the product
}
