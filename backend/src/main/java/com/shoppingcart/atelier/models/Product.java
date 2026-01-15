package com.shoppingcart.atelier.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_id")
    private Long pId;

    @Column(name = "p_category_id", nullable = false)
    private Long pCategoryId;

    @Column(name = "p_name", nullable = false)
    private String pName;

    @Column(name = "p_description", nullable = false, columnDefinition = "TEXT")
    private String pDescription;

    @Column(name = "p_sku", unique = true, nullable = false)
    private String pSku;

    @Column(name = "p_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal pPrice;

    @Column(name = "p_cost_price", precision = 10, scale = 2)
    private BigDecimal pCostPrice;

    @Column(name = "p_stock_quantity", nullable = false)
    private Integer pStockQuantity = 0;

    @Column(name = "p_size", length = 50)
    private String pSize;

    @Column(name = "p_color", length = 50)
    private String pColor;

    @Column(name = "p_gender", length = 20)
    private String pGender;

    @Column(name = "p_image_url", length = 500)
    private String pImageUrl;

    @Column(name = "p_is_active", nullable = false)
    private Boolean pIsActive = true;

    @Column(name = "p_is_featured", nullable = false)
    private Boolean pIsFeatured = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "p_created_by")
    private Long pCreatedBy;

    // Constructor
    public Product() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getpId() {
        return pId;
    }

    public void setpId(Long pId) {
        this.pId = pId;
    }

    public Long getpCategoryId() {
        return pCategoryId;
    }

    public void setpCategoryId(Long pCategoryId) {
        this.pCategoryId = pCategoryId;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getpDescription() {
        return pDescription;
    }

    public void setpDescription(String pDescription) {
        this.pDescription = pDescription;
    }

    public String getpSku() {
        return pSku;
    }

    public void setpSku(String pSku) {
        this.pSku = pSku;
    }

    public BigDecimal getpPrice() {
        return pPrice;
    }

    public void setpPrice(BigDecimal pPrice) {
        this.pPrice = pPrice;
    }

    public BigDecimal getpCostPrice() {
        return pCostPrice;
    }

    public void setpCostPrice(BigDecimal pCostPrice) {
        this.pCostPrice = pCostPrice;
    }

    public Integer getpStockQuantity() {
        return pStockQuantity;
    }

    public void setpStockQuantity(Integer pStockQuantity) {
        this.pStockQuantity = pStockQuantity;
    }

    public String getpSize() {
        return pSize;
    }

    public void setpSize(String pSize) {
        this.pSize = pSize;
    }

    public String getpColor() {
        return pColor;
    }

    public void setpColor(String pColor) {
        this.pColor = pColor;
    }

    public String getpGender() {
        return pGender;
    }

    public void setpGender(String pGender) {
        this.pGender = pGender;
    }

    public String getpImageUrl() {
        return pImageUrl;
    }

    public void setpImageUrl(String pImageUrl) {
        this.pImageUrl = pImageUrl;
    }

    public Boolean getpIsActive() {
        return pIsActive;
    }

    public void setpIsActive(Boolean pIsActive) {
        this.pIsActive = pIsActive;
    }

    public Boolean getpIsFeatured() {
        return pIsFeatured;
    }

    public void setpIsFeatured(Boolean pIsFeatured) {
        this.pIsFeatured = pIsFeatured;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getpCreatedBy() {
        return pCreatedBy;
    }

    public void setpCreatedBy(Long pCreatedBy) {
        this.pCreatedBy = pCreatedBy;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
