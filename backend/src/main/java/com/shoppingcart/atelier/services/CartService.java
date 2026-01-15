package com.shoppingcart.atelier.services;

import com.shoppingcart.atelier.dto.AddToCartRequest;
import com.shoppingcart.atelier.models.Cart;
import com.shoppingcart.atelier.models.CartItem;
import com.shoppingcart.atelier.models.Product;
import com.shoppingcart.atelier.repositories.CartItemRepository;
import com.shoppingcart.atelier.repositories.CartRepository;
import com.shoppingcart.atelier.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public Cart getOrCreateCart(String sessionId) {
        return cartRepository.findBySessionId(sessionId)
                .orElseGet(() -> {
                    Cart cart = Cart.builder()
                            .sessionId(sessionId)
                            .totalPrice(BigDecimal.ZERO)
                            .itemCount(0)
                            .build();
                    return cartRepository.save(cart);
                });
    }

    public Cart addToCart(String sessionId, AddToCartRequest request) {
        Cart cart = getOrCreateCart(sessionId);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId());

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            item.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .unitPrice(product.getPrice())
                    .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity())))
                    .build();
            cartItemRepository.save(newItem);
        }

        updateCartTotals(cart);
        return cart;
    }

    public Cart removeFromCart(String sessionId, Long productId) {
        Cart cart = getOrCreateCart(sessionId);
        Optional<CartItem> item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

        item.ifPresent(cartItemRepository::delete);
        updateCartTotals(cart);
        return cart;
    }

    public Cart updateCartItem(String sessionId, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(sessionId);
        Optional<CartItem> item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

        if (item.isPresent()) {
            CartItem cartItem = item.get();
            if (quantity <= 0) {
                cartItemRepository.delete(cartItem);
            } else {
                cartItem.setQuantity(quantity);
                cartItem.setTotalPrice(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(quantity)));
                cartItemRepository.save(cartItem);
            }
        }

        updateCartTotals(cart);
        return cart;
    }

    public Cart getCart(String sessionId) {
        return getOrCreateCart(sessionId);
    }

    public void clearCart(String sessionId) {
        Optional<Cart> cart = cartRepository.findBySessionId(sessionId);
        if (cart.isPresent()) {
            Cart c = cart.get();
            c.getItems().clear();
            c.setTotalPrice(BigDecimal.ZERO);
            c.setItemCount(0);
            cartRepository.save(c);
        }
    }

    private void updateCartTotals(Cart cart) {
        BigDecimal total = BigDecimal.ZERO;
        int itemCount = 0;

        for (CartItem item : cart.getItems()) {
            total = total.add(item.getTotalPrice());
            itemCount += item.getQuantity();
        }

        cart.setTotalPrice(total);
        cart.setItemCount(itemCount);
        cartRepository.save(cart);
    }
}
