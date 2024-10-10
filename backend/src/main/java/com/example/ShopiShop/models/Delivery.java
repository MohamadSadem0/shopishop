package com.example.ShopiShop.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "delivery_date", nullable = false)
    private Date deliveryDate;  // The delivery date

    private String deliveryStatus;  // Status of delivery, e.g., "Shipped", "Delivered"

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location deliveryAddress;  // Delivery address

    @OneToOne(mappedBy = "delivery")
    private Order order;  // The order associated with this delivery
}
