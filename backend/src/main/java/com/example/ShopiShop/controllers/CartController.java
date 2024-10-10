package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.CartItemRequestDTO;
import com.example.ShopiShop.dto.response.CartItemResponseDTO;
import com.example.ShopiShop.servicesIMPL.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/cart")
public class CartController {

    @Autowired
    private CartServiceImpl cartService;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody CartItemRequestDTO cartItemRequest) {
        cartService.addToCart(cartItemRequest.getUserId(), cartItemRequest.getProductId(), cartItemRequest.getQuantity());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItemResponseDTO>> getCartItemsByUser(@PathVariable Long userId) {
        List<CartItemResponseDTO> cartItems = cartService.getCartItemsByUser(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
