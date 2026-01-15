package com.shoppingcart.atelier.utils;

import com.shoppingcart.atelier.dto.OrderDTO;
import com.shoppingcart.atelier.dto.OrderItemDTO;
import com.shoppingcart.atelier.models.Order;
import com.shoppingcart.atelier.models.OrderItem;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        if (order == null) {
            return null;
        }

        return OrderDTO.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .customerEmail(order.getCustomerEmail())
                .customerName(order.getCustomerName())
                .items(order.getItems().stream()
                        .map(OrderMapper::itemToDTO)
                        .collect(Collectors.toList()))
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    public static OrderItemDTO itemToDTO(OrderItem item) {
        if (item == null) {
            return null;
        }

        return OrderItemDTO.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .totalPrice(item.getTotalPrice())
                .build();
    }
}
