package com.shoppingcart.atelier.utils;

import com.shoppingcart.atelier.dto.CartDTO;
import com.shoppingcart.atelier.dto.CartItemDTO;
import com.shoppingcart.atelier.models.Cart;
import com.shoppingcart.atelier.models.CartItem;

import java.util.stream.Collectors;

public class CartMapper {

    public static CartDTO toDTO(Cart cart) {
        if (cart == null) {
            return null;
        }

        return CartDTO.builder()
                .id(cart.getId())
                .sessionId(cart.getSessionId())
                .items(cart.getItems().stream()
                        .map(CartMapper::itemToDTO)
                        .collect(Collectors.toList()))
                .totalPrice(cart.getTotalPrice())
                .itemCount(cart.getItemCount())
                .build();
    }

    public static CartItemDTO itemToDTO(CartItem item) {
        if (item == null) {
            return null;
        }

        return CartItemDTO.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .totalPrice(item.getTotalPrice())
                .build();
    }
}
