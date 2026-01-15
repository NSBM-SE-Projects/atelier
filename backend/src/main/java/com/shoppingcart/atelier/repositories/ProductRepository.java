package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsActiveTrue();

    List<Product> findByIsFeaturedTrueAndIsActiveTrue();

    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);

    List<Product> findByGenderAndIsActiveTrue(String gender);

    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
}
