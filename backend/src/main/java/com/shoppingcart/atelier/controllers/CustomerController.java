package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.CustomerDTO;
import com.shoppingcart.atelier.models.User;
import com.shoppingcart.atelier.repositories.UserRepository;
import com.shoppingcart.atelier.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;
    private final UserRepository userRepository;

    /**
     * Get all customers
     * GET /api/admin/customers
     */
    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        System.out.println("=== GET /api/admin/customers called ===");
        List<CustomerDTO> customers = customerService.getAllCustomers();
        System.out.println("=== Returning " + customers.size() + " customers ===");
        return ResponseEntity.ok(customers);
    }

    /**
     * Get customer counts (total, active, inactive)
     * GET /api/admin/customers/counts
     */
    @GetMapping("/counts")
    public ResponseEntity<Map<String, Long>> getCustomerCounts() {
        Map<String, Long> counts = customerService.getCustomerCounts();
        return ResponseEntity.ok(counts);
    }

    /**
     * Get customer by ID
     * GET /api/admin/customers/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        try {
            CustomerDTO customer = customerService.getCustomerById(id);
            return ResponseEntity.ok(customer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update customer details
     * PUT /api/admin/customers/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(
            @PathVariable Long id,
            @RequestBody CustomerDTO customerDTO) {
        try {
            CustomerDTO customer = customerService.updateCustomer(id, customerDTO);
            return ResponseEntity.ok(customer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update customer active status
     * PATCH /api/admin/customers/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<CustomerDTO> updateCustomerStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        try {
            Boolean isActive = body.get("isActive");
            CustomerDTO customer = customerService.updateCustomerStatus(id, isActive);
            return ResponseEntity.ok(customer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DEBUG: Get all users with their types to diagnose issues
     * GET /api/admin/customers/debug/all-users
     */
    @GetMapping("/debug/all-users")
    public ResponseEntity<Map<String, Object>> debugGetAllUsers() {
        List<User> allUsers = userRepository.findAll();

        Map<String, Object> result = new HashMap<>();
        result.put("totalUsers", allUsers.size());

        // Get unique user types
        List<String> userTypes = allUsers.stream()
                .map(User::getUserType)
                .distinct()
                .collect(Collectors.toList());
        result.put("userTypes", userTypes);

        // Get users summary
        List<Map<String, Object>> usersSummary = allUsers.stream()
                .map(u -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", u.getId());
                    m.put("userType", u.getUserType());
                    m.put("username", u.getUsername());
                    m.put("email", u.getEmail());
                    m.put("isActive", u.getIsActive());
                    return m;
                })
                .collect(Collectors.toList());
        result.put("users", usersSummary);

        return ResponseEntity.ok(result);
    }

    /**
     * DEBUG: Get all users as CustomerDTO (no filtering)
     * GET /api/admin/customers/debug/all-as-dto
     */
    @GetMapping("/debug/all-as-dto")
    public ResponseEntity<List<CustomerDTO>> debugGetAllAsDTO() {
        List<User> allUsers = userRepository.findAll();
        System.out.println("DEBUG: Found " + allUsers.size() + " total users");

        List<CustomerDTO> allDTOs = allUsers.stream()
                .map(user -> CustomerDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .username(user.getUsername())
                        .fullName(user.getFullName())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .city(user.getCity())
                        .postalCode(user.getPostalCode())
                        .country(user.getCountry())
                        .createdAt(user.getCreatedAt())
                        .lastLogin(user.getLastLogin())
                        .isActive(user.getIsActive())
                        .build())
                .collect(Collectors.toList());

        System.out.println("DEBUG: Returning " + allDTOs.size() + " DTOs");
        return ResponseEntity.ok(allDTOs);
    }
}
