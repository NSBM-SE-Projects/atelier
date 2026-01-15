package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.CreateProductRequest;
import com.shoppingcart.atelier.models.Category;
import com.shoppingcart.atelier.models.Product;
import com.shoppingcart.atelier.repositories.CategoryRepository;
import com.shoppingcart.atelier.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getAllActiveProducts() {
        return productRepository.findByIsActiveTrue();
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryIdAndIsActiveTrue(categoryId);
    }

    public List<Product> getProductsByGender(String gender) {
        return productRepository.findByGenderAndIsActiveTrue(gender.toUpperCase());
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(query);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .category(category)
                .name(request.getName())
                .description(request.getDescription())
                .sku(request.getSku())
                .price(request.getPrice())
                .costPrice(request.getCostPrice())
                .stockQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0)
                .size(request.getSize())
                .color(request.getColor())
                .gender(request.getGender())
                .imageUrl(request.getImageUrl())
                .isActive(request.getIsActive() != null && request.getIsActive())
                .isFeatured(request.getIsFeatured() != null && request.getIsFeatured())
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, CreateProductRequest request) {
        return productRepository.findById(id)
                .map(existing -> {
                    if (request.getCategoryId() != null) {
                        Category category = categoryRepository.findById(request.getCategoryId())
                                .orElseThrow(() -> new RuntimeException("Category not found"));
                        existing.setCategory(category);
                    }
                    if (request.getName() != null) existing.setName(request.getName());
                    if (request.getDescription() != null) existing.setDescription(request.getDescription());
                    if (request.getSku() != null) existing.setSku(request.getSku());
                    if (request.getPrice() != null) existing.setPrice(request.getPrice());
                    if (request.getCostPrice() != null) existing.setCostPrice(request.getCostPrice());
                    if (request.getStockQuantity() != null) existing.setStockQuantity(request.getStockQuantity());
                    if (request.getSize() != null) existing.setSize(request.getSize());
                    if (request.getColor() != null) existing.setColor(request.getColor());
                    if (request.getGender() != null) existing.setGender(request.getGender());
                    if (request.getImageUrl() != null) existing.setImageUrl(request.getImageUrl());
                    if (request.getIsActive() != null) existing.setIsActive(request.getIsActive());
                    if (request.getIsFeatured() != null) existing.setIsFeatured(request.getIsFeatured());
                    return productRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
