package com.example.ShopiShop.servicesIMPL;


import com.example.ShopiShop.dto.response.CartItemResponseDTO;

import com.example.ShopiShop.exceptions.EntityNotFoundException;

import com.example.ShopiShop.models.*;
import com.example.ShopiShop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
public class CartServiceImpl {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public void addToCart(Long userId, UUID productId, int quantity) {
        // Fetch the user from the database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Fetch the product from the database
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        // Create a new CartItem and associate it with the user and product
        CartItem cartItem = CartItem.builder()
                .user(user)
                .product(product)
                .quantity(quantity)
                .build();

        // Save the CartItem to the database
        cartItemRepository.save(cartItem);
    }


    public List<CartItemResponseDTO> getCartItemsByUser(Long id) {
        return cartItemRepository.findByUserId(id).stream()
                .map(cartItem -> CartItemResponseDTO.builder()
                        .id(cartItem.getId())
                        .productId(cartItem.getProduct().getId())
                        .productName(cartItem.getProduct().getName())
                        .quantity(cartItem.getQuantity())
                        .price(cartItem.getProduct().getPrice())
                        .build())
                .collect(Collectors.toList());
    }

    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void clearCart(Long id) {
        cartItemRepository.deleteAll(cartItemRepository.findByUserId(id));
    }
}
