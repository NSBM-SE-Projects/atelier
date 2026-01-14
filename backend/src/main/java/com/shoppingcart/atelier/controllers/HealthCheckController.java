package com.shoppingcart.atelier.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// Health Check Controller
@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

// Endpoint: GET /api/health/backend
    @GetMapping("/backend")
    public ResponseEntity<Map<String, Object>> checkBackend() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "BACKEND IS RUNNING SUCCESFULLY!");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    // Endpoint: GET /api/health/database
    @GetMapping("/database")
    public ResponseEntity<Map<String, Object>> checkDatabase() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Simple query
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            response.put("status", "UP");
            response.put("message", "DATABASE IS CONNECTED AND RESPONDING!");
            response.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "DOWN");
            response.put("message", "DATABASE CONNECTION FAILED: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(response);
        }
    }

// Endpoint: GET /api/health
    @GetMapping
    public ResponseEntity<Map<String, Object>> checkAll() {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> components = new HashMap<>();

        // Backend status
        components.put("backend", "UP");

        // Database status
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            components.put("database", "UP");
        } catch (Exception e) {
            components.put("database", "DOWN");
        }

        response.put("status", components.containsValue("DOWN") ? "PARTIAL" : "UP");
        response.put("components", components);
        response.put("message", "HEALTH CHECK COMPLETE!");
        response.put("timestamp", System.currentTimeMillis());

        // Return 200 even if partial (for testing purposes)
        return ResponseEntity.ok(response);
    }
}
