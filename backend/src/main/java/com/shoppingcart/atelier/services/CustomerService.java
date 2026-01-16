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
     * Get all customers - direct SQL query
     */
    public List<CustomerDTO> getAllCustomers() {
        List<User> customers = userRepository.findAllCustomers();
        return customers.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get customer counts - direct SQL queries
     */
    public Map<String, Long> getCustomerCounts() {
        long total = userRepository.countCustomers();
        long active = userRepository.countActiveCustomers();
        long inactive = userRepository.countInactiveCustomers();

        Map<String, Long> counts = new HashMap<>();
        counts.put("total", total);
        counts.put("active", active);
        counts.put("inactive", inactive);
        return counts;
    }

    /**
     * Get customer by ID
     */
    public CustomerDTO getCustomerById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));
        return mapToDTO(user);
    }

    /**
     * Update customer status (active/inactive)
     */
    public CustomerDTO updateCustomerStatus(Long id, Boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));
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
