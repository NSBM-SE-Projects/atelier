package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.CategorySalesDTO;
import com.shoppingcart.atelier.models.Category;
import com.shoppingcart.atelier.repositories.CategoryRepository;
import com.shoppingcart.atelier.repositories.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final OrderItemRepository orderItemRepository;
    private final CategoryRepository categoryRepository;

    /**
     * Get sales by category for a given time period
     * @param period - "daily", "weekly", or "monthly"
     * @return List of category sales
     */
    public List<CategorySalesDTO> getSalesByCategory(String period) {
        LocalDateTime startDate;
        LocalDateTime endDate = LocalDateTime.now();

        switch (period.toLowerCase()) {
            case "daily":
                startDate = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
                break;
            case "weekly":
                startDate = LocalDateTime.of(LocalDate.now().minusDays(7), LocalTime.MIN);
                break;
            case "monthly":
                startDate = LocalDateTime.of(LocalDate.now().minusMonths(1), LocalTime.MIN);
                break;
            default:
                startDate = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        }

        // Get all categories
        List<Category> allCategories = categoryRepository.findAll();

        // Get sales data
        List<Object[]> salesData = orderItemRepository.getSalesByCategory(startDate, endDate);

        // Convert to map for easy lookup
        Map<String, Long> salesMap = salesData.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> ((Number) row[1]).longValue()
                ));

        // Build result with all categories (including those with zero sales)
        List<CategorySalesDTO> result = new ArrayList<>();
        for (Category category : allCategories) {
            Long sales = salesMap.getOrDefault(category.getName(), 0L);
            result.add(CategorySalesDTO.builder()
                    .categoryName(category.getName())
                    .salesCount(sales)
                    .build());
        }

        return result;
    }
}
