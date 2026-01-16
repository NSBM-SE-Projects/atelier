package com.shoppingcart.atelier.utils;

import com.shoppingcart.atelier.dto.ProductDTO;
import com.shoppingcart.atelier.models.Product;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }

        return ProductDTO.builder()
                .id(product.getId())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getSku())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .size(product.getSize())
                .color(product.getColor())
                .gender(product.getGender())
                .imageUrl(product.getImageUrl())
                .isActive(product.getIsActive())
                .isFeatured(product.getIsFeatured())
                .build();
    }
}
