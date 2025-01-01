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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private static final Logger logger = LoggerFactory.getLogger(StoreServiceImpl.class);

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private StoreMapper storeMapper;
    private UUIDconvertor uuiDconvertor;
    private final NotificationServiceImpl notificationService;

    public Store createStore(UserSignupRequestDTO request, User user, Location location) {
        System.out.println("Creating store with request: " + request.getBusinessName() +
                ", user email: " + user.getEmail() + ", location: " + location.getAddressLine());

        UUID sectionId = UUIDconvertor.stringToUUID("0x" + request.getSectionId());
        System.out.println("Converted section ID: " + sectionId);

        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid section ID"));
        System.out.println("Fetched section: " + section.getName());

        Store store = Store.builder()
                .name(request.getBusinessName())
                .owner(user)
                .location(location)
                .section(section)
                .isApproved(false)
                .imageUrl(request.getImageUrl())
                .build();

        System.out.println("Saving store: " + store.getName() + ", owner email: " + user.getEmail());
        Store savedStore = storeRepository.save(store);
        System.out.println("Saved store ID: " + savedStore.getId());

        return savedStore;
    }

    public Store createStore(StoreRequestDTO storeRequestDTO) {
        System.out.println("Creating store with request DTO: " + storeRequestDTO.getBusinessName());

        UUID id = uuiDconvertor.convertToUUID(storeRequestDTO.getSectionId());
        System.out.println("Converted section ID: " + id);

        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        System.out.println("Fetched section: " + section.getName());

        User owner = userRepository.findById(storeRequestDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        System.out.println("Fetched owner email: " + owner.getEmail());

        Store store = StoreMapper.toEntity(storeRequestDTO, owner, section);
        System.out.println("Mapped store entity: " + store.getName());

        Store savedStore = storeRepository.save(store);
        System.out.println("Saved store ID: " + savedStore.getId());

        return savedStore;
    }

    public Store getStoreById(Long id) {
        System.out.println("Fetching store by ID: " + id);

        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found with ID: " + id));
        System.out.println("Fetched store: " + store.getName());

        return store;
    }

    public Store getStoreByOwnerEmail(String email) {
        System.out.println("Fetching store by owner email: " + email);

        Store store = storeRepository.findByOwnerEmail(email).orElse(null);
        if (store != null) {
            System.out.println("Fetched store: " + store.getName());
        } else {
            System.out.println("No store found for email: " + email);
        }

        return store;
    }

    public List<StoreResponseDTO> getAllStores() {
        System.out.println("Fetching all stores");

        List<Store> stores = storeRepository.findAll();
        System.out.println("Fetched stores count: " + stores.size());

        List<StoreResponseDTO> storeResponseDTOs = stores.stream()
                .map(StoreMapper::toDTO)
                .collect(Collectors.toList());
        System.out.println("Mapped store response DTOs count: " + storeResponseDTOs.size());

        return storeResponseDTOs;
    }

    public List<StoreResponseApprovedDTO> getAllApprovedStores() {
        System.out.println("Fetching all approved stores");

        List<Store> approvedStores = storeRepository.findAll().stream()
                .filter(Store::isApproved)
                .collect(Collectors.toList());
        System.out.println("Filtered approved stores count: " + approvedStores.size());

        List<StoreResponseApprovedDTO> approvedDTOs = approvedStores.stream()
                .map(StoreMapper::toApprovedDTO)
                .collect(Collectors.toList());
        System.out.println("Mapped approved store DTOs count: " + approvedDTOs.size());

        return approvedDTOs;
    }

    public void deleteAllStores() {
        System.out.println("Deleting all stores");
        storeRepository.deleteAll();
        System.out.println("All stores deleted");
    }

    @Override
    public String approveStore(Long storeId) {
        System.out.println("Approving store with ID: " + storeId);

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));
        System.out.println("Fetched store: " + store.getName());

        if (store.isApproved()) {
            System.out.println("Store is already approved: " + store.getName());
            throw new IllegalStateException("Store is already approved");
        }

        store.setApproved(true);
        Store updatedStore = storeRepository.save(store);
        System.out.println("Updated store approval status: " + updatedStore.getName());

        notificationService.notifyMerchant(store.getOwner().getEmail(), "Your store has been approved!");
        System.out.println("Notification sent to store owner: " + store.getOwner().getEmail());

        return "Store " + store.getName() + " has been approved";
    }
}