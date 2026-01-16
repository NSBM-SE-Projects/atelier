package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.UpdateProfileRequest;
import com.shoppingcart.atelier.dto.UserResponse;
import com.shoppingcart.atelier.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get user profile by ID
     * @param userId The user ID
     * @return UserResponse with user profile details
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable Long userId) {
        UserResponse response = userService.getUserProfile(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update user profile
     * @param userId The user ID
     * @param updateProfileRequest Updated profile data
     * @return UserResponse with updated user details
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUserProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateProfileRequest updateProfileRequest) {
        UserResponse response = userService.updateUserProfile(userId, updateProfileRequest);
        return ResponseEntity.ok(response);
    }
}
