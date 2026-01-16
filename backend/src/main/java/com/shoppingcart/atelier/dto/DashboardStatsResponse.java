package com.shoppingcart.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {

    private long totalCustomers;
    private long totalOrders;
    private long totalProducts;
    private BigDecimal totalRevenue;
    private BigDecimal dailySales;
    private long dailyOrders;
}
