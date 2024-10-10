package com.example.ShopiShop.dto.request;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemRequestDTO {
    private Long userId;
    private UUID productId;
    private int quantity;
}
