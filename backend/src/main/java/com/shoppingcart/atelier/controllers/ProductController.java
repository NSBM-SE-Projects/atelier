package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.models.Product;
import com.shoppingcart.atelier.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // GET /api/products/featured
    // Display featured products
    @GetMapping("/featured")
    public ResponseEntity<List<Product>> getFeaturedProducts() {
        List<Product> featuredProducts = productRepository.findByPIsFeaturedTrueAndPIsActiveTrue();
        return ResponseEntity.ok(featuredProducts);
    }

    // GET /api/products
    // All products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findByPIsActiveTrue();
        return ResponseEntity.ok(products);
    }
    
    // GET /api/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/products/latest
    // Latest products
    @GetMapping("/latest")
    public ResponseEntity<List<Product>> getLatestProducts() {
        List<Product> latestProducts = productRepository.findTop4ByPIsActiveTrueOrderByCreatedAtDesc();
        return ResponseEntity.ok(latestProducts);
    }
}
