package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.LoginRequest;
import com.shoppingcart.atelier.dto.LoginResponse;
import com.shoppingcart.atelier.dto.RegisterRequest;
import com.shoppingcart.atelier.models.Customer;
import com.shoppingcart.atelier.models.User;
import com.shoppingcart.atelier.repositories.UserRepository;
import com.shoppingcart.atelier.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Login user with username and password
     * @param request LoginRequest containing username and password
     * @return LoginResponse with user details
     * @throws ResponseStatusException if credentials are invalid
     */
    public LoginResponse login(LoginRequest request) {
        // Find user by username (case-sensitive for security)
        Optional<User> user = userRepository.findByuUsernameAnduIsActiveTrue(request.getUsername());

        if (user.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        User foundUser = user.get();

        // Verify password using BCrypt
        if (!PasswordUtil.verifyPassword(request.getPassword(), foundUser.getUPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        // Update last login timestamp
        foundUser.setULastLogin(LocalDateTime.now());
        userRepository.save(foundUser);

        // Return user info in response
        return LoginResponse.builder()
                .userId(foundUser.getUId())
                .username(foundUser.getUUsername())
                .email(foundUser.getUEmail())
                .userType(foundUser.getUserType())
                .message("Login successful")
                .build();
    }

    /**
     * Register new user
     * @param request RegisterRequest with user details
     * @return LoginResponse with newly created user details
     * @throws ResponseStatusException if registration fails
     */
    public LoginResponse register(RegisterRequest request) {
        // Validate passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Passwords do not match"
            );
        }

        // If username already exists
        if (userRepository.existsByuUsername(request.getUsername())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username already exists"
            );
        }

        // If email already exists
        if (userRepository.existsByuEmail(request.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        // Create new customer
        Customer newCustomer = new Customer();
        newCustomer.setUUsername(request.getUsername());
        newCustomer.setUEmail(request.getEmail());
        newCustomer.setUPassword(PasswordUtil.hashPassword(request.getPassword()));
        newCustomer.setUFullName(request.getUsername());
        newCustomer.setUIsActive(true);

        // Save to database
        User savedUser = userRepository.save(newCustomer);

        // Return user info in response
        return LoginResponse.builder()
                .userId(savedUser.getUId())
                .username(savedUser.getUUsername())
                .email(savedUser.getUEmail())
                .userType(savedUser.getUserType())
                .message("Registration successful")
                .build();
    }
}
