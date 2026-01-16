package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.models.Activity;
import com.shoppingcart.atelier.repositories.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/test")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TestController {

    private final ActivityRepository activityRepository;

    /**
     * Generate sample activities for testing
     * POST /api/admin/test/generate-activities
     */
    @PostMapping("/generate-activities")
    public ResponseEntity<Map<String, String>> generateSampleActivities() {
        // Create sample signup activities
        Activity signup1 = Activity.builder()
                .activityType("SIGNUP")
                .title("New Customer Signup")
                .description("A new customer has registered on the platform")
                .userName("John Smith")
                .userEmail("john.smith@email.com")
                .isRead(false)
                .build();
        activityRepository.save(signup1);

        Activity signup2 = Activity.builder()
                .activityType("SIGNUP")
                .title("New Customer Signup")
                .description("A new customer has registered on the platform")
                .userName("Sarah Johnson")
                .userEmail("sarah.j@email.com")
                .isRead(false)
                .build();
        activityRepository.save(signup2);

        Activity signup3 = Activity.builder()
                .activityType("SIGNUP")
                .title("New Customer Signup")
                .description("A new customer has registered on the platform")
                .userName("Mike Wilson")
                .userEmail("mike.w@email.com")
                .isRead(true)
                .build();
        activityRepository.save(signup3);

        // Create sample order activities
        Activity order1 = Activity.builder()
                .activityType("ORDER_PLACED")
                .title("New Order Placed")
                .description("Order #1001 has been placed - Total: $150.00")
                .userName("Emma Davis")
                .userEmail("emma.d@email.com")
                .isRead(false)
                .build();
        activityRepository.save(order1);

        Activity order2 = Activity.builder()
                .activityType("ORDER_PLACED")
                .title("New Order Placed")
                .description("Order #1002 has been placed - Total: $89.99")
                .userName("James Brown")
                .userEmail("james.b@email.com")
                .isRead(true)
                .build();
        activityRepository.save(order2);

        // Create sample order completed activity
        Activity completed = Activity.builder()
                .activityType("ORDER_COMPLETED")
                .title("Order Completed")
                .description("Order #998 has been delivered successfully")
                .userName("Lisa Anderson")
                .userEmail("lisa.a@email.com")
                .isRead(true)
                .build();
        activityRepository.save(completed);

        return ResponseEntity.ok(Map.of(
                "message", "Sample activities generated successfully",
                "count", "6"
        ));
    }
}
