package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.UpdateProfileRequest;
import com.shoppingcart.atelier.dto.UserResponse;
import com.shoppingcart.atelier.models.User;
import com.shoppingcart.atelier.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get user profile by ID
     * @param userId The ID of the user
     * @return UserResponse with user details
     * @throws ResponseStatusException if user not found or inactive
     */
    public UserResponse getUserProfile(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty() || !user.get().getUIsActive()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            );
        }

        User foundUser = user.get();
        return convertToUserResponse(foundUser);
    }

    /**
     * Update user profile
     * @param userId The ID of the user
     * @param request UpdateProfileRequest with new profile data
     * @return UserResponse with updated user details
     * @throws ResponseStatusException if user not found or email conflict
     */
    public UserResponse updateUserProfile(Long userId, UpdateProfileRequest request) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty() || !user.get().getUIsActive()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            );
        }

        User foundUser = user.get();

        // Check if new email is different and if it already exists
        if (!foundUser.getUEmail().equals(request.getEmail())) {
            if (userRepository.existsByuEmail(request.getEmail())) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Email already exists"
                );
            }
        }

        // Update fields
        foundUser.setUEmail(request.getEmail());
        foundUser.setUFullName(request.getFullName());
        foundUser.setUPhone(request.getPhone());
        foundUser.setUAddress(request.getAddress());
        foundUser.setUCity(request.getCity());
        foundUser.setUPostalCode(request.getPostalCode());
        foundUser.setUCountry(request.getCountry());
        foundUser.setUpdatedAt(LocalDateTime.now());

        // Save updated user
        User updatedUser = userRepository.save(foundUser);

        return convertToUserResponse(updatedUser);
    }

    /**
     * Convert User entity to UserResponse DTO
     */
    private UserResponse convertToUserResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUId())
                .username(user.getUUsername())
                .email(user.getUEmail())
                .fullName(user.getUFullName())
                .phone(user.getUPhone())
                .address(user.getUAddress())
                .city(user.getUCity())
                .postalCode(user.getUPostalCode())
                .country(user.getUCountry())
                .userType(user.getUserType())
                .isActive(user.getUIsActive())
                .build();
    }
}
