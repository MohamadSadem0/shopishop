package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.response.StoreResponseApprovedDTO;
import com.example.ShopiShop.dto.response.StoreResponseDTO;
import com.example.ShopiShop.mappers.StoreMapper;
import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.dto.request.StoreRequestDTO;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.UserRepository;
import com.example.ShopiShop.services.StoreService;
import com.example.ShopiShop.utils.UUIDconvertor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service

@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private StoreMapper storeMapper;
    private UUIDconvertor uuiDconvertor;
    private final NotificationServiceImpl notificationService;



    public Store createStore(UserSignupRequestDTO request, User user, Location location) {
        Section section = sectionRepository.findById(UUIDconvertor.stringToUUID(request.getSectionId()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid section ID"));

        return storeRepository.save(Store.builder()
                .name(request.getBusinessName())
                .owner(user) // Associate the persisted user
                .location(location)
                .section(section)
                .isApproved(false) // Default to not approved
                .imageUrl(request.getImageUrl()) // Assuming image URL is provided
                .build());
    }


    public Store createStore(StoreRequestDTO storeRequestDTO  ) {


        UUID id =uuiDconvertor.convertToUUID(storeRequestDTO.getSectionId());
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("section not found"));


        // Find the user by ownerId
        User owner = userRepository.findById(storeRequestDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        // Map the DTO to Store entity
        Store store = com.example.ShopiShop.mappers.StoreMapper.toEntity(storeRequestDTO, owner,section);

        // Save the store in the database
        return storeRepository.save(store);
    }

public Store getStoreById(Long id){
        return storeRepository.findById(id).orElseThrow(()->new RuntimeException("store not found with id"+id));
}
public Store getStoreByOwnerEmail(String email){
//        return storeRepository.findByOwnerEmail(email).orElseThrow(()->new RuntimeException("store not found with id"+email));
        return storeRepository.findByOwnerEmail(email).orElse(null);
}

    public List<StoreResponseDTO> getAllStores() {
        // Retrieve all stores from the repository
        List<Store> stores = storeRepository.findAll();

        // Map each Store entity to StoreResponseDTO
        return stores.stream()
                .map(com.example.ShopiShop.mappers.StoreMapper::toDTO) // Using the StoreMapper to convert Store to StoreResponseDTO
                .collect(Collectors.toList());
    }

    public List<StoreResponseApprovedDTO> getAllApprovedStores() {
        // Retrieve all stores and filter for approved ones
        List<Store> approvedStores = storeRepository.findAll().stream()
                .filter(Store::isApproved) // Filter stores where isApproved is true
                .collect(Collectors.toList());

        // Use StoreMapper to map each approved Store entity to StoreResponseApprovedDTO
        return approvedStores.stream()
                .map(StoreMapper::toApprovedDTO) // Use the mapper for conversion
                .collect(Collectors.toList());
    }


    public void deleteAllStores() {
        storeRepository.deleteAll();
    }

    @Override
    public String approveStore(Long storeId) {
        // Fetch the store entity by ID
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));

        // Check if the store is already approved
        if (store.isApproved()) {
            throw new IllegalStateException("Store is already approved");
        }

        // Set the store's approval status to true
        store.setApproved(true);
        Store updatedStore = storeRepository.save(store);

        // Send real-time notification to the store owner
        notificationService.notifyMerchant(store.getOwner().getEmail(), "Your store has been approved!");

        // Return the response DTO
        return "store " +store.getName() + "has been approved";
    }
}
