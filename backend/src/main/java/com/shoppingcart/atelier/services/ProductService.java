package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.ProductDTO;
import com.shoppingcart.atelier.models.Category;
import com.shoppingcart.atelier.models.Product;
import com.shoppingcart.atelier.repositories.CategoryRepository;
import com.shoppingcart.atelier.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        return mapToDTO(product);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        // Get category
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + productDTO.getCategoryId()));

        Product product = Product.builder()
                .category(category)
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .sku(productDTO.getSku())
                .price(productDTO.getPrice())
                .costPrice(productDTO.getCostPrice())
                .stockQuantity(productDTO.getStockQuantity() != null ? productDTO.getStockQuantity() : 0)
                .size(productDTO.getSize())
                .color(productDTO.getColor())
                .gender(productDTO.getGender())
                .imageUrl(productDTO.getImageUrl())
                .isActive(productDTO.getIsActive() != null ? productDTO.getIsActive() : true)
                .isFeatured(productDTO.getIsFeatured() != null ? productDTO.getIsFeatured() : false)
                .build();

        Product savedProduct = productRepository.save(product);
        return mapToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        // Update category if provided
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + productDTO.getCategoryId()));
            product.setCategory(category);
        }

        // Update other fields if provided
        if (productDTO.getName() != null) {
            product.setName(productDTO.getName());
        }
        if (productDTO.getDescription() != null) {
            product.setDescription(productDTO.getDescription());
        }
        if (productDTO.getSku() != null) {
            product.setSku(productDTO.getSku());
        }
        if (productDTO.getPrice() != null) {
            product.setPrice(productDTO.getPrice());
        }
        if (productDTO.getCostPrice() != null) {
            product.setCostPrice(productDTO.getCostPrice());
        }
        if (productDTO.getStockQuantity() != null) {
            product.setStockQuantity(productDTO.getStockQuantity());
        }
        if (productDTO.getSize() != null) {
            product.setSize(productDTO.getSize());
        }
        if (productDTO.getColor() != null) {
            product.setColor(productDTO.getColor());
        }
        if (productDTO.getGender() != null) {
            product.setGender(productDTO.getGender());
        }
        if (productDTO.getImageUrl() != null) {
            product.setImageUrl(productDTO.getImageUrl());
        }
        if (productDTO.getIsActive() != null) {
            product.setIsActive(productDTO.getIsActive());
        }
        if (productDTO.getIsFeatured() != null) {
            product.setIsFeatured(productDTO.getIsFeatured());
        }

        Product savedProduct = productRepository.save(product);
        return mapToDTO(savedProduct);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        productRepository.delete(product);
    }

    public ProductDTO updateProductStatus(Long id, Boolean isActive) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setIsActive(isActive);
        productRepository.save(product);
        return mapToDTO(product);
    }

    public ProductDTO updateProductFeatured(Long id, Boolean isFeatured) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setIsFeatured(isFeatured);
        productRepository.save(product);
        return mapToDTO(product);
    }

    public ProductDTO updateStock(Long id, Integer stockQuantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStockQuantity(stockQuantity);
        productRepository.save(product);
        return mapToDTO(product);
    }

    private ProductDTO mapToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getSku())
                .price(product.getPrice())
                .costPrice(product.getCostPrice())
                .stockQuantity(product.getStockQuantity())
                .size(product.getSize())
                .color(product.getColor())
                .gender(product.getGender())
                .imageUrl(product.getImageUrl())
                .isActive(product.getIsActive())
                .isFeatured(product.getIsFeatured())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}
