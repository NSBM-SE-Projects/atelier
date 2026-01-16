package com.shoppingcart.atelier.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long id;
    private String orderNumber;
    private String customerEmail;
    private String customerName;
    private List<OrderItemDTO> items;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
