package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.LoginRequest;
import com.shoppingcart.atelier.dto.LoginResponse;
import com.shoppingcart.atelier.dto.RegisterRequest;
import com.shoppingcart.atelier.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Login endpoint
     * @param loginRequest Contains username and password
     * @return LoginResponse with user details and message
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * Register endpoint
     * @param registerRequest Contains username, email, password, confirmPassword
     * @return LoginResponse with newly created user details
     */
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        LoginResponse response = authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
