package com.example.ShopiShop.services.IMPL;

import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.models.dto.StoreRequestDTO;
import com.example.ShopiShop.models.dto.StoreMapper;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;


    public UUID convertToUUID(String hexString) {
        // Return null if hexString is null or empty
        if (hexString == null || hexString.isEmpty()) {
            return null;
        }

        // Remove the "0x" prefix if it exists
        if (hexString.startsWith("0x")) {
            hexString = hexString.substring(2);
        }

        // Reformat the string to match the UUID format
        String formattedUUID = hexString.replaceFirst(
                "(\\w{8})(\\w{4})(\\w{4})(\\w{4})(\\w+)",
                "$1-$2-$3-$4-$5"
        );

        // Convert to UUID
        return UUID.fromString(formattedUUID);
    }


    public Store createStore(StoreRequestDTO storeRequestDTO  ) {


        UUID id =convertToUUID(storeRequestDTO.getSectionId());
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Owner not found"));


        // Find the user by ownerId
        User owner = userRepository.findById(storeRequestDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        // Map the DTO to Store entity
        Store store = StoreMapper.toEntity(storeRequestDTO, owner,section);

        // Save the store in the database
        return storeRepository.save(store);
    }




}
