package com.shoppingcart.atelier.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_id")
    private Long id;

    @Column(name = "u_type", nullable = false, length = 20)
    private String userType; // CUSTOMER or STAFF

    @Column(name = "u_email", nullable = false, unique = true)
    private String email;

    @Column(name = "u_username", nullable = false, unique = true, length = 100)
    private String username;

    @Column(name = "u_password", nullable = false)
    private String password;

    @Column(name = "u_fullName", nullable = false, length = 200)
    private String fullName;

    @Column(name = "u_phone", length = 20)
    private String phone;

    @Column(name = "u_address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "u_city", length = 100)
    private String city;

    @Column(name = "u_postal_code", length = 20)
    private String postalCode;

    @Column(name = "u_country", length = 100)
    private String country;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "u_last_login")
    private LocalDateTime lastLogin;

    @Column(name = "u_is_active", nullable = false)
    private Boolean isActive;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
