package com.example.ShopiShop.models.dto;

import com.example.ShopiShop.models.Location;
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
