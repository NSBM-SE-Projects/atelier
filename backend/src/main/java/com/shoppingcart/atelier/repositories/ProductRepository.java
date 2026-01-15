package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // All active products
    List<Product> findByPIsActiveTrue();

    // Find featured and active products
    List<Product> findByPIsFeaturedTrueAndPIsActiveTrue();

    // Find latest active products ordered by creation date
    List<Product> findTop4ByPIsActiveTrueOrderByCreatedAtDesc();
}
