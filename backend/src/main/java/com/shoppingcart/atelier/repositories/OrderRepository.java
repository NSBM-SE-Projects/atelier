package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Count all orders
    long count();

    // Sum of all order totals (revenue)
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    BigDecimal getTotalRevenue();

    // Sum of today's orders (daily sales)
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.createdAt >= :startOfDay")
    BigDecimal getDailySales(@Param("startOfDay") LocalDateTime startOfDay);

    // Count today's orders
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt >= :startOfDay")
    long countDailyOrders(@Param("startOfDay") LocalDateTime startOfDay);

    // Top spenders for today - returns customer id, username, and total spent
    @Query("SELECT o.customer.id, o.customer.username, SUM(o.totalAmount) as totalSpent " +
           "FROM Order o " +
           "WHERE o.createdAt >= :startOfDay " +
           "GROUP BY o.customer.id, o.customer.username " +
           "ORDER BY totalSpent DESC " +
           "LIMIT 3")
    List<Object[]> getTopDailySpenders(@Param("startOfDay") LocalDateTime startOfDay);

    // Top spenders of all time
    @Query("SELECT o.customer.id, o.customer.username, SUM(o.totalAmount) as totalSpent " +
           "FROM Order o " +
           "GROUP BY o.customer.id, o.customer.username " +
           "ORDER BY totalSpent DESC " +
           "LIMIT 3")
    List<Object[]> getTopSpendersAllTime();

    // Get all orders sorted by creation date descending
    List<Order> findAllByOrderByCreatedAtDesc();

    // Get all orders with customer data (JOIN FETCH to avoid lazy loading issues)
    @Query("SELECT o FROM Order o JOIN FETCH o.customer ORDER BY o.createdAt DESC")
    List<Order> findAllWithCustomer();

    // Get order by ID with customer data
    @Query("SELECT o FROM Order o JOIN FETCH o.customer WHERE o.id = :id")
    Order findByIdWithCustomer(@Param("id") Long id);
}
