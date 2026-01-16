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

        // Count customers (users with type CUSTOMER only)
        long totalCustomers = userRepository.countByUserType("CUSTOMER");

        // Count products
        long totalProducts = productRepository.countByIsActiveTrue();

        // Count orders
        long totalOrders = orderRepository.count();

        // Get total revenue
        BigDecimal totalRevenue = orderRepository.getTotalRevenue();

        // Get daily sales
        BigDecimal dailySales = orderRepository.getDailySales(startOfDay);

        // Get daily orders count
        long dailyOrders = orderRepository.countDailyOrders(startOfDay);

        return DashboardStatsResponse.builder()
                .totalCustomers(totalCustomers)
                .totalOrders(totalOrders)
                .totalProducts(totalProducts)
                .totalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO)
                .dailySales(dailySales != null ? dailySales : BigDecimal.ZERO)
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
