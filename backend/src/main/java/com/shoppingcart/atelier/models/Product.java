package com.shoppingcart.atelier.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "p_category_id", nullable = false)
    private Category category;

    @Column(name = "p_name", nullable = false, length = 255)
    private String name;

    @Column(name = "p_description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "p_sku", nullable = false, unique = true, length = 100)
    private String sku;

    @Column(name = "p_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "p_cost_price", precision = 10, scale = 2)
    private BigDecimal costPrice;

    @Column(name = "p_stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "p_size", length = 50)
    private String size;

    @Column(name = "p_color", length = 50)
    private String color;

    @Column(name = "p_gender", length = 20)
    private String gender;

    @Column(name = "p_image_url", length = 500)
    private String imageUrl;

    @Column(name = "p_is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "p_is_featured", nullable = false)
    private Boolean isFeatured;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "p_created_by")
    private Long createdBy;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) isActive = true;
        if (isFeatured == null) isFeatured = false;
        if (stockQuantity == null) stockQuantity = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
