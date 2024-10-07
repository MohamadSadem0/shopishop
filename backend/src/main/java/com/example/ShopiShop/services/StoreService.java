package com.example.ShopiShop.services;


import com.example.ShopiShop.dto.response.StoreResponseDTO;
import com.example.ShopiShop.models.Store;

public interface StoreService {
    Store getStoreById(Long storeId);
    public String approveStore(Long storeId) ;

    }
