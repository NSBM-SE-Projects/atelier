package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.CategorySalesDTO;
import com.shoppingcart.atelier.services.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesController {

    private final SalesService salesService;

    /**
     * Get Sales by Category
     * GET /api/admin/sales/by-category?period=daily|weekly|monthly
     */
    @GetMapping("/by-category")
    public ResponseEntity<List<CategorySalesDTO>> getSalesByCategory(
            @RequestParam(defaultValue = "monthly") String period) {
        List<CategorySalesDTO> sales = salesService.getSalesByCategory(period);
        return ResponseEntity.ok(sales);
    }
}
