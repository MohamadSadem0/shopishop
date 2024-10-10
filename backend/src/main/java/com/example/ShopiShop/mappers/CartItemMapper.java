package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.CartItemRequestDTO;
import com.example.ShopiShop.dto.response.CartItemResponseDTO;
import com.example.ShopiShop.models.CartItem;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.models.User;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {

    public CartItemResponseDTO toResponse(CartItem cartItem) {
        return CartItemResponseDTO.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .quantity(cartItem.getQuantity())
                .price(cartItem.getProduct().getPrice())
                .build();
    }

    public CartItem toEntity(CartItemRequestDTO dto, User user, Product product) {
        return CartItem.builder()
                .user(user)
                .product(product)
                .quantity(dto.getQuantity())
                .build();
    }
}
