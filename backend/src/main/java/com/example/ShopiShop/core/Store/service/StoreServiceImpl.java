package com.example.ShopiShop.core.Store.service;

import com.example.ShopiShop.core.Store.dto.StoreRequestDTO;
import com.example.ShopiShop.core.Store.dto.StoreMapper;
import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.core.Store.repository.StoreRepository;
import com.example.ShopiShop.core.User.model.User;
import com.example.ShopiShop.core.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;



    public Store createStore(StoreRequestDTO storeRequestDTO) {
        // Find the user by ownerId
        User owner = userRepository.findById(storeRequestDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        // Map the DTO to Store entity
        Store store = StoreMapper.toEntity(storeRequestDTO, owner);

        // Save the store in the database
        return storeRepository.save(store);
    }
}
