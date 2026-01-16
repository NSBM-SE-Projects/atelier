package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.CustomerDTO;
import com.shoppingcart.atelier.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;

    /**
     * Get all customers
     * GET /api/admin/customers
     */
    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<CustomerDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    /**
     * Get customer by ID
     * GET /api/admin/customers/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        CustomerDTO customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    /**
     * Update customer active status
     * PATCH /api/admin/customers/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<CustomerDTO> updateCustomerStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        Boolean isActive = body.get("isActive");
        CustomerDTO customer = customerService.updateCustomerStatus(id, isActive);
        return ResponseEntity.ok(customer);
    }
}
