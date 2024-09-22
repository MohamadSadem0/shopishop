package com.example.ShopiShop.core.Store.dto;
import com.example.ShopiShop.core.Store.dto.StoreRequestDTO;
import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.core.User.model.User;
import com.example.ShopiShop.modules.Location.model.Location;

public class StoreMapper {

    // Mapping from StoreRequestDTO to Store entity
    public static Store toEntity(StoreRequestDTO storeRequestDTO, User owner) {
        Location location = Location.builder()
                .addressLine(storeRequestDTO.getAddressLine())
                .city(storeRequestDTO.getCity())
                .state(storeRequestDTO.getState())
                .zipCode(storeRequestDTO.getZipCode())
                .country(storeRequestDTO.getCountry())
                .latitude(storeRequestDTO.getLatitude())
                .longitude(storeRequestDTO.getLongitude())
                .build();

        return Store.builder()
                .name(storeRequestDTO.getName())
                .owner(owner) // Pass in the User object (owner)
                .location(location) // Set location based on DTO
                .isApproved(false) // By default, the store is not approved
                .build();
    }
}
