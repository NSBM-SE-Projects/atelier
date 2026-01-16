package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    long countByIsActiveTrue();

    List<Product> findAllByOrderByCreatedAtDesc();
}
