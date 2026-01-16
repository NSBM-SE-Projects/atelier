package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Get sales quantity by category within a date range
    @Query("SELECT c.name, COALESCE(SUM(oi.quantity), 0) " +
           "FROM OrderItem oi " +
           "JOIN oi.product p " +
           "JOIN p.category c " +
           "JOIN oi.order o " +
           "WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate " +
           "GROUP BY c.id, c.name " +
           "ORDER BY c.name")
    List<Object[]> getSalesByCategory(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    // Get all categories with their sales (including zero sales)
    @Query("SELECT c.name, COALESCE(SUM(CASE WHEN o.createdAt >= :startDate AND o.createdAt <= :endDate THEN oi.quantity ELSE 0 END), 0) " +
           "FROM Category c " +
           "LEFT JOIN Product p ON p.category = c " +
           "LEFT JOIN OrderItem oi ON oi.product = p " +
           "LEFT JOIN Order o ON oi.order = o " +
           "GROUP BY c.id, c.name " +
           "ORDER BY c.name")
    List<Object[]> getAllCategoriesWithSales(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
