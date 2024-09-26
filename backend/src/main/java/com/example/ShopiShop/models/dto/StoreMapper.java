package com.example.ShopiShop.models.dto;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.models.Location;

public class StoreMapper {

    // Mapping from StoreRequestDTO to Store entity
    public static Store toEntity(StoreRequestDTO storeRequestDTO, User owner, Section section) {
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
                .section(section)
                .location(location) // Set location based on DTO
                .isApproved(false) // By default, the store is not approved
                .build();
    }
}
