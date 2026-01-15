package com.shoppingcart.atelier.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class to generate BCrypt password hashes
 * Use this to create hashes for new passwords for testing or database seeding
 */
public class PasswordHashGenerator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Password to hash
        String plainPassword = "password123";

        // Generate hash
        String hashedPassword = encoder.encode(plainPassword);

        System.out.println("Plain Password: " + plainPassword);
        System.out.println("BCrypt Hash: " + hashedPassword);

        // Verify it works
        boolean matches = encoder.matches(plainPassword, hashedPassword);
        System.out.println("\nVerification: " + (matches ? "Hash is valid" : "Hash verification failed"));
    }
}
