package com.example.ShopiShop.core.User.model;
import com.example.ShopiShop.enums.userRoleEnum;
import com.example.ShopiShop.modules.Location.model.Location;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String userName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private userRoleEnum userROle;


    @Column(name="email")
    private String email;

    @Column(name="Password")
    private String password;

    @Column(name="location_id")
    @OneToOne
    private Location location;

    @Column(name="review")

    @Column(name="shoppingHistory")



}
