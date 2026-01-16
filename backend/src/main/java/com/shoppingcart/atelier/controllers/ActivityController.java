package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.ActivityDTO;
import com.shoppingcart.atelier.services.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/activities")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService activityService;

    /**
     * Get all activities
     * GET /api/admin/activities
     */
    @GetMapping
    public ResponseEntity<List<ActivityDTO>> getAllActivities() {
        List<ActivityDTO> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    /**
     * Get unread notifications
     * GET /api/admin/activities/notifications
     */
    @GetMapping("/notifications")
    public ResponseEntity<Map<String, Object>> getNotifications() {
        List<ActivityDTO> unread = activityService.getUnreadNotifications();
        long count = activityService.getUnreadCount();

        return ResponseEntity.ok(Map.of(
                "notifications", unread,
                "unreadCount", count
        ));
    }

    /**
     * Get unread count only
     * GET /api/admin/activities/notifications/count
     */
    @GetMapping("/notifications/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        long count = activityService.getUnreadCount();
        return ResponseEntity.ok(Map.of("count", count));
    }

    /**
     * Mark all notifications as read
     * POST /api/admin/activities/notifications/mark-all-read
     */
    @PostMapping("/notifications/mark-all-read")
    public ResponseEntity<Map<String, String>> markAllAsRead() {
        activityService.markAllAsRead();
        return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
    }

    /**
     * Mark single notification as read
     * POST /api/admin/activities/notifications/{id}/mark-read
     */
    @PostMapping("/notifications/{id}/mark-read")
    public ResponseEntity<Map<String, String>> markAsRead(@PathVariable Long id) {
        activityService.markAsRead(id);
        return ResponseEntity.ok(Map.of("message", "Notification marked as read"));
    }
}
