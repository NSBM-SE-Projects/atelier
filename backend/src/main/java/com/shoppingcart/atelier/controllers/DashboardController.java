package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.DashboardStatsResponse;
import com.shoppingcart.atelier.dto.TopSpenderDTO;
import com.shoppingcart.atelier.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Get Dashboard Statistics
     * GET /api/admin/dashboard/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        DashboardStatsResponse stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get Top Daily Spenders (Top 3)
     * GET /api/admin/dashboard/top-spenders
     */
    @GetMapping("/top-spenders")
    public ResponseEntity<List<TopSpenderDTO>> getTopSpenders() {
        List<TopSpenderDTO> topSpenders = dashboardService.getTopDailySpenders();
        return ResponseEntity.ok(topSpenders);
    }
}
