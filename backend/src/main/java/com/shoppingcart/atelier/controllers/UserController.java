package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.SignUpRequest;
import com.shoppingcart.atelier.dto.SignUpResponse;
import com.shoppingcart.atelier.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins:*}")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@Valid @RequestBody SignUpRequest request) {
        SignUpResponse response = userService.signUp(request);

        if (response.getSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
