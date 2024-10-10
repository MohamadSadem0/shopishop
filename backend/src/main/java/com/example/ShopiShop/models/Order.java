package com.example.ShopiShop.models;

import com.example.ShopiShop.enums.OrderStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data  // Generates getters, setters, equals, hashCode, toString, and more
@AllArgsConstructor
@NoArgsConstructor
@Builder  // Generates a builder pattern
@Table(name = "customer_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // The user who placed the order

    @ManyToMany
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;  // List of products in the order

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id", referencedColumnName = "id")
    private Payment payment;  // Payment details for the order

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "delivery_id", referencedColumnName = "id")
    private Delivery delivery;  // Delivery details

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;  // The date when the order was placed

    @Enumerated(EnumType.STRING)
    private OrderStatusEnum status;  // Order status (e.g., PENDING, SHIPPED, DELIVERED)
}
