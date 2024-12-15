package com.example.ShopiShop.models;

import com.example.ShopiShop.models.User;
import com.example.ShopiShop.models.Location;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "store")

public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = false)
    private User owner;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "location_id", referencedColumnName = "id", nullable = true)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY ,optional = true)
    @JoinColumn(name = "section_id", nullable = true)
    private Section section;

    @Column(name = "is_approved",  nullable = false)
    private boolean isApproved =false;

    @Column(name = "image_url",  nullable = false)
    private String ImageUrl ;
}
