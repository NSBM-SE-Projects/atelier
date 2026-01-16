package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.LoginRequest;
import com.shoppingcart.atelier.dto.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    // Hardcoded admin credentials - ONLY ONE ADMIN
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "atelier@admin2024";

    // Simple token storage (in production, use Redis or database)
    private String currentAdminToken = null;

    /**
     * Admin login - validates against hardcoded credentials
     */
    public LoginResponse adminLogin(LoginRequest request) {
        // Check if credentials match the hardcoded admin credentials
        if (ADMIN_USERNAME.equals(request.getUsername()) &&
            ADMIN_PASSWORD.equals(request.getPassword())) {

            // Generate a simple token
            String token = UUID.randomUUID().toString();
            currentAdminToken = token;

            return LoginResponse.builder()
                    .success(true)
                    .message("Admin login successful")
                    .username(ADMIN_USERNAME)
                    .userType("ADMIN")
                    .token(token)
                    .build();
        }

        return LoginResponse.builder()
                .success(false)
                .message("Invalid username or password")
                .build();
    }

    /**
     * Validate admin token
     */
    public boolean validateAdminToken(String token) {
        return token != null && token.equals(currentAdminToken);
    }

    /**
     * Admin logout - invalidates the token
     */
    public void adminLogout() {
        currentAdminToken = null;
    }
}
