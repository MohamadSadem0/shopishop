package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.StoreRequestDTO;
import com.example.ShopiShop.dto.response.StoreResponseDTO;
import com.example.ShopiShop.dto.response.StoreResponseApprovedDTO;
import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.models.User;

public class StoreMapper {

    // Map Store entity to StoreResponseDTO
    public static StoreResponseDTO toDTO(Store store) {
        if (store == null) {
            return null;
        }

        return StoreResponseDTO.builder()
                .id(store.getId())
                .name(store.getName())
                .ownerName(store.getOwner() != null ? store.getOwner().getUsername() : null) // Assuming 'username' is the correct field
                .isApproved(store.isApproved())
                .sectionName(store.getSection() != null ? store.getSection().getName() : null)
                .build();
    }

    // Map Store entity to StoreResponseApprovedDTO
    public static StoreResponseApprovedDTO toApprovedDTO(Store store) {
        if (store == null) {
            return null;
        }

        return StoreResponseApprovedDTO.builder()
                .id(store.getId())
                .name(store.getName())
                .ownerName(store.getOwner() != null ? store.getOwner().getUsername() : null) // Assuming 'username' is the correct field
                .sectionName(store.getSection() != null ? store.getSection().getName() : null)
                .build();
    }

    // Map StoreRequestDTO to Store entity
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
                .owner(owner)
                .section(section)
                .location(location)
                .isApproved(false) // By default, the store is not approved
                .build();
    }
}
