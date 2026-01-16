package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.LoginRequest;
import com.shoppingcart.atelier.dto.LoginResponse;
import com.shoppingcart.atelier.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    /**
     * Admin Login Endpoint
     * POST /api/admin/login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> adminLogin(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.adminLogin(request);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

    /**
     * Validate Admin Token
     * GET /api/admin/validate
     */
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of(
                    "valid", false,
                    "message", "No token provided"
            ));
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        boolean isValid = authService.validateAdminToken(token);

        if (isValid) {
            return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "message", "Token is valid"
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                    "valid", false,
                    "message", "Invalid or expired token"
            ));
        }
    }

    /**
     * Admin Logout Endpoint
     * POST /api/admin/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> adminLogout() {
        authService.adminLogout();
        return ResponseEntity.ok(Map.of(
                "message", "Logged out successfully"
        ));
    }
}
