package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.SignUpRequest;
import com.shoppingcart.atelier.dto.SignUpResponse;
import com.shoppingcart.atelier.models.User;
import com.shoppingcart.atelier.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public SignUpResponse signUp(SignUpRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return SignUpResponse.builder()
                    .success(false)
                    .message("Email already registered")
                    .build();
        }

        // Check if passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return SignUpResponse.builder()
                    .success(false)
                    .message("Passwords do not match")
                    .build();
        }

        // Create new user
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(Base64.getEncoder().encodeToString(request.getPassword().getBytes()))
                .isActive(true)
                .build();

        User savedUser = userRepository.save(user);

        return SignUpResponse.builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .message("Account created successfully")
                .success(true)
                .build();
    }
}
