package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.OrderDTO;
import com.shoppingcart.atelier.models.Order;
import com.shoppingcart.atelier.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllWithCustomer()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findByIdWithCustomer(id);
        if (order == null) {
            throw new RuntimeException("Order not found");
        }
        return mapToDTO(order);
    }

    public OrderDTO updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findByIdWithCustomer(id);
        if (order == null) {
            throw new RuntimeException("Order not found");
        }
        order.setStatus(status);

        // Set completed date if status is COMPLETED or DELIVERED
        if ("COMPLETED".equalsIgnoreCase(status) || "DELIVERED".equalsIgnoreCase(status)) {
            order.setCompletedAt(LocalDateTime.now());
        }

        orderRepository.save(order);
        return mapToDTO(order);
    }

    public OrderDTO updateAdminNotes(Long id, String notes) {
        Order order = orderRepository.findByIdWithCustomer(id);
        if (order == null) {
            throw new RuntimeException("Order not found");
        }
        order.setAdminNotes(notes);
        orderRepository.save(order);
        return mapToDTO(order);
    }

    private OrderDTO mapToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .customerId(order.getCustomer().getId())
                .customerName(order.getCustomer().getFullName())
                .customerEmail(order.getCustomer().getEmail())
                .subtotal(order.getSubtotal())
                .taxAmount(order.getTaxAmount())
                .shippingAmount(order.getShippingAmount())
                .discountAmount(order.getDiscountAmount())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .shippingAddress(order.getShippingAddress())
                .shippingCity(order.getShippingCity())
                .shippingPostalCode(order.getShippingPostalCode())
                .shippingCountry(order.getShippingCountry())
                .paymentMethod(order.getPaymentMethod())
                .customerNotes(order.getCustomerNotes())
                .adminNotes(order.getAdminNotes())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .completedAt(order.getCompletedAt())
                .build();
    }
}
