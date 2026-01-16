package com.shoppingcart.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityDTO {

    private Long id;
    private String activityType;
    private String title;
    private String description;
    private String userName;
    private String userEmail;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private String timeAgo;
}
