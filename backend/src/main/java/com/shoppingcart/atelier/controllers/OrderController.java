package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.CreateOrderRequest;
import com.shoppingcart.atelier.dto.OrderDTO;
import com.shoppingcart.atelier.models.Order;
import com.shoppingcart.atelier.services.OrderService;
import com.shoppingcart.atelier.utils.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            Order order = orderService.createOrderFromCart(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(OrderMapper.toDTO(order));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(order -> ResponseEntity.ok(OrderMapper.toDTO(order)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<OrderDTO> getOrderByNumber(@PathVariable String orderNumber) {
        return orderService.getOrderByNumber(orderNumber)
                .map(order -> ResponseEntity.ok(OrderMapper.toDTO(order)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{email}")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomer(@PathVariable String email) {
        List<Order> orders = orderService.getOrdersByCustomerEmail(email);
        List<OrderDTO> dtos = orders.stream()
                .map(OrderMapper::toDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<OrderDTO>> getOrdersByStatus(@PathVariable String status) {
        List<Order> orders = orderService.getOrdersByStatus(status);
        List<OrderDTO> dtos = orders.stream()
                .map(OrderMapper::toDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderDTO> dtos = orders.stream()
                .map(OrderMapper::toDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Order order = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(OrderMapper.toDTO(order));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
