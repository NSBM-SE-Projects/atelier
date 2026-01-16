package com.shoppingcart.atelier.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {

    private String customerEmail;
    private String customerName;
    private String sessionId;
}
