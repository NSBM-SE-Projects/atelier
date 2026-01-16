package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.ProductDTO;
import com.shoppingcart.atelier.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    /**
     * Get all products
     * GET /api/admin/products
     */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Get product by ID
     * GET /api/admin/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * Update product active status
     * PATCH /api/admin/products/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ProductDTO> updateProductStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        Boolean isActive = body.get("isActive");
        ProductDTO product = productService.updateProductStatus(id, isActive);
        return ResponseEntity.ok(product);
    }

    /**
     * Update product featured status
     * PATCH /api/admin/products/{id}/featured
     */
    @PatchMapping("/{id}/featured")
    public ResponseEntity<ProductDTO> updateProductFeatured(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        Boolean isFeatured = body.get("isFeatured");
        ProductDTO product = productService.updateProductFeatured(id, isFeatured);
        return ResponseEntity.ok(product);
    }

    /**
     * Update product stock
     * PATCH /api/admin/products/{id}/stock
     */
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductDTO> updateStock(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        Integer stockQuantity = body.get("stockQuantity");
        ProductDTO product = productService.updateStock(id, stockQuantity);
        return ResponseEntity.ok(product);
    }
}
