package com.example.ShopiShop.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "address_line", nullable = true)
    private String addressLine;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "state", nullable = true)
    private String state = "";

    @Column(name = "zip_code", nullable = true)
    private String zipCode= "";

    @Column(name = "country", nullable = true)
    private String country= "";

    // Add latitude and longitude for Google Maps integration
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    // Relationship to User (Optional for Customers)
    @OneToOne(mappedBy = "location")
    private User user;

    // Relationship to Store (Optional for Merchants)
    @OneToOne(mappedBy = "location")
    private Store store;
}
