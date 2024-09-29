package com.example.ShopiShop.mappers;

import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.models.dto.StoreResponseDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class StoreMapper {

    public static StoreResponseDTO toDTO(Store store) {
        if (store == null) {
            return null;
        }

        // Adjusting the field names based on what might exist in the User and Location class
        return StoreResponseDTO.builder()
                .id(store.getId())
                .name(store.getName())
                // Assuming 'username' is the correct field in User class
                .ownerName(store.getOwner() != null ? store.getOwner().getUsername() : null)
                // Assuming 'address' is the correct field in Location class
                .isApproved(store.isApproved())
                .build();
    }
}
