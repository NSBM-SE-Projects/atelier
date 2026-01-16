package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.DashboardStatsResponse;
import com.shoppingcart.atelier.dto.TopSpenderDTO;
import com.shoppingcart.atelier.repositories.OrderRepository;
import com.shoppingcart.atelier.repositories.ProductRepository;
import com.shoppingcart.atelier.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DashboardStatsResponse getDashboardStats() {
        // Get start of today
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);

        // Count customers - direct SQL query
        long totalCustomers = 0;
        try {
            totalCustomers = userRepository.countCustomers();
        } catch (Exception e) {
            System.err.println("Error counting customers: " + e.getMessage());
        }

        // Count products
        long totalProducts = 0;
        try {
            totalProducts = productRepository.countByIsActiveTrue();
        } catch (Exception e) {
            System.err.println("Error counting products: " + e.getMessage());
            // Try counting all products as fallback
            try {
                totalProducts = productRepository.count();
            } catch (Exception e2) {
                System.err.println("Error counting all products: " + e2.getMessage());
            }
        }

        // Count orders
        long totalOrders = 0;
        try {
            totalOrders = orderRepository.count();
        } catch (Exception e) {
            System.err.println("Error counting orders: " + e.getMessage());
        }

        // Get total revenue
        BigDecimal totalRevenue = BigDecimal.ZERO;
        try {
            totalRevenue = orderRepository.getTotalRevenue();
            if (totalRevenue == null) totalRevenue = BigDecimal.ZERO;
        } catch (Exception e) {
            System.err.println("Error getting total revenue: " + e.getMessage());
        }

        // Get daily sales
        BigDecimal dailySales = BigDecimal.ZERO;
        try {
            dailySales = orderRepository.getDailySales(startOfDay);
            if (dailySales == null) dailySales = BigDecimal.ZERO;
        } catch (Exception e) {
            System.err.println("Error getting daily sales: " + e.getMessage());
        }

        // Get daily orders count
        long dailyOrders = 0;
        try {
            dailyOrders = orderRepository.countDailyOrders(startOfDay);
        } catch (Exception e) {
            System.err.println("Error counting daily orders: " + e.getMessage());
        }

        return DashboardStatsResponse.builder()
                .totalCustomers(totalCustomers)
                .totalOrders(totalOrders)
                .totalProducts(totalProducts)
                .totalRevenue(totalRevenue)
                .dailySales(dailySales)
                .dailyOrders(dailyOrders)
                .build();
    }

    public List<TopSpenderDTO> getTopDailySpenders() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);

        List<Object[]> results = orderRepository.getTopDailySpenders(startOfDay);

        // If no daily spenders, get all-time top spenders
        if (results.isEmpty()) {
            results = orderRepository.getTopSpendersAllTime();
        }

        List<TopSpenderDTO> topSpenders = new ArrayList<>();
        int rank = 1;

        for (Object[] row : results) {
            TopSpenderDTO spender = TopSpenderDTO.builder()
                    .rank(rank++)
                    .customerId((Long) row[0])
                    .customerName((String) row[1])
                    .totalSpent((BigDecimal) row[2])
                    .build();
            topSpenders.add(spender);
        }

        return topSpenders;
    }
}
