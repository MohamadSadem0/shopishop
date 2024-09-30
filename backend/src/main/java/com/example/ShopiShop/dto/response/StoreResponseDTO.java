package com.example.ShopiShop.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreResponseDTO {

    private Long id;
    private String name;
    private String ownerName;

    private boolean isApproved;
}
