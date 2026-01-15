package com.shoppingcart.atelier.models;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "u_first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "u_last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "u_email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "u_password", nullable = false)
    private String password;

    @Column(name = "u_is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;
}
