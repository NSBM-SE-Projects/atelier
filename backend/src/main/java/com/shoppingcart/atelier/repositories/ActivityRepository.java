package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    // Get all activities ordered by date (newest first)
    List<Activity> findAllByOrderByCreatedAtDesc();

    // Get unread activities (notifications)
    List<Activity> findByIsReadFalseOrderByCreatedAtDesc();

    // Count unread activities
    long countByIsReadFalse();

    // Mark all as read
    @Modifying
    @Query("UPDATE Activity a SET a.isRead = true WHERE a.isRead = false")
    void markAllAsRead();

    // Get activities by type
    List<Activity> findByActivityTypeOrderByCreatedAtDesc(String activityType);
}
