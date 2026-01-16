package com.shoppingcart.atelier.controllers;

import com.shoppingcart.atelier.dto.AddToCartRequest;
import com.shoppingcart.atelier.dto.CartDTO;
import com.shoppingcart.atelier.models.Cart;
import com.shoppingcart.atelier.services.CartService;
import com.shoppingcart.atelier.utils.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{sessionId}")
    public ResponseEntity<CartDTO> getCart(@PathVariable String sessionId) {
        Cart cart = cartService.getCart(sessionId);
        return ResponseEntity.ok(CartMapper.toDTO(cart));
    }

    @PostMapping("/{sessionId}/add")
    public ResponseEntity<CartDTO> addToCart(@PathVariable String sessionId, @RequestBody AddToCartRequest request) {
        try {
            Cart cart = cartService.addToCart(sessionId, request);
            return ResponseEntity.ok(CartMapper.toDTO(cart));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{sessionId}/remove/{productId}")
    public ResponseEntity<CartDTO> removeFromCart(@PathVariable String sessionId, @PathVariable Long productId) {
        Cart cart = cartService.removeFromCart(sessionId, productId);
        return ResponseEntity.ok(CartMapper.toDTO(cart));
    }

    @PutMapping("/{sessionId}/update/{productId}")
    public ResponseEntity<CartDTO> updateCartItem(@PathVariable String sessionId, @PathVariable Long productId, @RequestParam Integer quantity) {
        try {
            Cart cart = cartService.updateCartItem(sessionId, productId, quantity);
            return ResponseEntity.ok(CartMapper.toDTO(cart));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{sessionId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable String sessionId) {
        cartService.clearCart(sessionId);
        return ResponseEntity.noContent().build();
    }
}
