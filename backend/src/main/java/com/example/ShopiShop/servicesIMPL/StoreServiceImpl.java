package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.dto.request.StoreRequestDTO;
import com.example.ShopiShop.dto.StoreMapper;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.UserRepository;
import com.example.ShopiShop.utils.UUIDconvertor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service

@RequiredArgsConstructor
public class StoreServiceImpl {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private  UUIDconvertor uuiDconvertor;



    void createStore(UserSignupRequestDTO request, User user, Location location) {
        System.out.println("-----------------------------------------------------------1");
        System.out.println("THIS IS USER . UUID"+request.getSectionId());

        System.out.println("-----------------------------------------------------------2");
        Section section = sectionRepository.findById(uuiDconvertor.convertToUUID(request.getSectionId()))
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));



        Store store = Store.builder()
                .name(request.getBusinessName() != null ? request.getBusinessName() : (request.getName() + "'s Store"))
                .location(location)
                .owner(user)
                .section(section)
                .isApproved(false)
                .build();

        storeRepository.save(store);
    }

    public Store createStore(StoreRequestDTO storeRequestDTO  ) {


        UUID id =uuiDconvertor.convertToUUID(storeRequestDTO.getSectionId());
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("section not found"));


        // Find the user by ownerId
        User owner = userRepository.findById(storeRequestDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        // Map the DTO to Store entity
        Store store = StoreMapper.toEntity(storeRequestDTO, owner,section);

        // Save the store in the database
        return storeRepository.save(store);
    }

public Store getStoreById(Long id){
        return storeRepository.findById(id).orElseThrow(()->new RuntimeException("store not found with id"+id));
}
public Store getStoreByOwnerEmail(String email){
        return storeRepository.findByOwnerEmail(email).orElseThrow(()->new RuntimeException("store not found with id"+email));
}


}
