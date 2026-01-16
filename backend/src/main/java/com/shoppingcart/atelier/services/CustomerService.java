package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.CustomerDTO;
import com.shoppingcart.atelier.models.User;
import com.shoppingcart.atelier.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final UserRepository userRepository;

    /**
     * Get all customers - fetches all users and filters by type in Java
     * This approach works regardless of database case sensitivity
     */
    public List<CustomerDTO> getAllCustomers() {
        // Get ALL users from database
        List<User> allUsers = userRepository.findAll();
        System.out.println("=== Total users in database: " + allUsers.size() + " ===");

        // Log all user types for debugging
        allUsers.forEach(user -> {
            System.out.println("User ID: " + user.getId() + ", Type: '" + user.getUserType() + "', Name: " + user.getFullName());
        });

        // Filter to only customers (case-insensitive check in Java, with trim)
        List<CustomerDTO> customers = allUsers.stream()
                .filter(user -> user.getUserType() != null &&
                        user.getUserType().trim().equalsIgnoreCase("CUSTOMER"))
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        System.out.println("=== Filtered customers: " + customers.size() + " ===");
        return customers;
    }

    /**
     * Get customer counts - total, active, inactive
     */
    public Map<String, Long> getCustomerCounts() {
        List<User> allUsers = userRepository.findAll();

        // Filter customers in Java
        List<User> customers = allUsers.stream()
                .filter(user -> user.getUserType() != null &&
                        user.getUserType().trim().equalsIgnoreCase("CUSTOMER"))
                .collect(Collectors.toList());

        long total = customers.size();
        long active = customers.stream().filter(u -> Boolean.TRUE.equals(u.getIsActive())).count();
        long inactive = customers.stream().filter(u -> !Boolean.TRUE.equals(u.getIsActive())).count();

        Map<String, Long> counts = new HashMap<>();
        counts.put("total", total);
        counts.put("active", active);
        counts.put("inactive", inactive);
        return counts;
    }

    /**
     * Get customer by ID - verifies the user is a customer
     */
    public CustomerDTO getCustomerById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));

        // Verify it's a customer
        if (user.getUserType() == null || !user.getUserType().trim().equalsIgnoreCase("CUSTOMER")) {
            throw new RuntimeException("User with ID " + id + " is not a customer");
        }

        return mapToDTO(user);
    }

    /**
     * Update customer status (active/inactive)
     */
    public CustomerDTO updateCustomerStatus(Long id, Boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));

        if (user.getUserType() == null || !user.getUserType().trim().equalsIgnoreCase("CUSTOMER")) {
            throw new RuntimeException("User with ID " + id + " is not a customer");
        }

        user.setIsActive(isActive);
        userRepository.save(user);
        return mapToDTO(user);
    }

    /**
     * Update customer details
     */
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));

        if (user.getUserType() == null || !user.getUserType().trim().equalsIgnoreCase("CUSTOMER")) {
            throw new RuntimeException("User with ID " + id + " is not a customer");
        }

        // Update allowed fields (not ID, not userType)
        if (customerDTO.getFullName() != null) {
            user.setFullName(customerDTO.getFullName());
        }
        if (customerDTO.getEmail() != null) {
            user.setEmail(customerDTO.getEmail());
        }
        if (customerDTO.getUsername() != null) {
            user.setUsername(customerDTO.getUsername());
        }
        if (customerDTO.getPhone() != null) {
            user.setPhone(customerDTO.getPhone());
        }
        if (customerDTO.getAddress() != null) {
            user.setAddress(customerDTO.getAddress());
        }
        if (customerDTO.getCity() != null) {
            user.setCity(customerDTO.getCity());
        }
        if (customerDTO.getPostalCode() != null) {
            user.setPostalCode(customerDTO.getPostalCode());
        }
        if (customerDTO.getCountry() != null) {
            user.setCountry(customerDTO.getCountry());
        }

        userRepository.save(user);
        return mapToDTO(user);
    }

    private CustomerDTO mapToDTO(User user) {
        return CustomerDTO.builder()
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
                .build();
    }
}
