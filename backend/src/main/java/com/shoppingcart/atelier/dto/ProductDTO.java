package com.shoppingcart.atelier.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private Long categoryId;
    private String categoryName;
    private String name;
    private String description;
    private String sku;
    private BigDecimal price;
    private Integer stockQuantity;
    private String size;
    private String color;
    private String gender;
    private String imageUrl;
    private Boolean isActive;
    private Boolean isFeatured;
}
