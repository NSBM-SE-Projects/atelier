package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.ActivityDTO;
import com.shoppingcart.atelier.models.Activity;
import com.shoppingcart.atelier.models.User;
import com.shoppingcart.atelier.repositories.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    /**
     * Get all activities
     */
    public List<ActivityDTO> getAllActivities() {
        return activityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get unread notifications
     */
    public List<ActivityDTO> getUnreadNotifications() {
        return activityRepository.findByIsReadFalseOrderByCreatedAtDesc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get unread count
     */
    public long getUnreadCount() {
        return activityRepository.countByIsReadFalse();
    }

    /**
     * Mark all notifications as read
     */
    @Transactional
    public void markAllAsRead() {
        activityRepository.markAllAsRead();
    }

    /**
     * Mark single notification as read
     */
    @Transactional
    public void markAsRead(Long activityId) {
        activityRepository.findById(activityId).ifPresent(activity -> {
            activity.setIsRead(true);
            activityRepository.save(activity);
        });
    }

    /**
     * Log a new customer signup activity
     */
    public void logCustomerSignup(User user) {
        Activity activity = Activity.builder()
                .activityType("SIGNUP")
                .title("New Customer Signup")
                .description("A new customer has registered on the platform")
                .user(user)
                .userName(user.getFullName())
                .userEmail(user.getEmail())
                .isRead(false)
                .build();
        activityRepository.save(activity);
    }

    /**
     * Log an order placed activity
     */
    public void logOrderPlaced(User customer, Long orderId) {
        Activity activity = Activity.builder()
                .activityType("ORDER_PLACED")
                .title("New Order Placed")
                .description("Order #" + orderId + " has been placed")
                .user(customer)
                .userName(customer.getFullName())
                .userEmail(customer.getEmail())
                .isRead(false)
                .build();
        activityRepository.save(activity);
    }

    /**
     * Log a generic activity
     */
    public void logActivity(String type, String title, String description, User user) {
        Activity activity = Activity.builder()
                .activityType(type)
                .title(title)
                .description(description)
                .user(user)
                .userName(user != null ? user.getFullName() : null)
                .userEmail(user != null ? user.getEmail() : null)
                .isRead(false)
                .build();
        activityRepository.save(activity);
    }

    /**
     * Convert Activity to DTO
     */
    private ActivityDTO toDTO(Activity activity) {
        return ActivityDTO.builder()
                .id(activity.getId())
                .activityType(activity.getActivityType())
                .title(activity.getTitle())
                .description(activity.getDescription())
                .userName(activity.getUserName())
                .userEmail(activity.getUserEmail())
                .isRead(activity.getIsRead())
                .createdAt(activity.getCreatedAt())
                .timeAgo(getTimeAgo(activity.getCreatedAt()))
                .build();
    }

    /**
     * Calculate time ago string
     */
    private String getTimeAgo(LocalDateTime dateTime) {
        Duration duration = Duration.between(dateTime, LocalDateTime.now());

        long seconds = duration.getSeconds();
        if (seconds < 60) {
            return "Just now";
        }

        long minutes = seconds / 60;
        if (minutes < 60) {
            return minutes + (minutes == 1 ? " minute ago" : " minutes ago");
        }

        long hours = minutes / 60;
        if (hours < 24) {
            return hours + (hours == 1 ? " hour ago" : " hours ago");
        }

        long days = hours / 24;
        if (days < 30) {
            return days + (days == 1 ? " day ago" : " days ago");
        }

        long months = days / 30;
        return months + (months == 1 ? " month ago" : " months ago");
    }
}
