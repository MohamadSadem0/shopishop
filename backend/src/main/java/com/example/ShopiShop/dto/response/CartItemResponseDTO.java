package com.example.ShopiShop.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponseDTO {
    private Long id;
    private UUID productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
}
