package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.exceptions.DuplicateEntityException;
import com.example.ShopiShop.mappers.SectionMapper;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.services.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final SectionMapper sectionMapper;
    private final StoreServiceImpl storeService;
    private final StoreRepository storeRepository;

    @Override
    public Section createSection(Section section) {
        return sectionRepository.save(section);
    }

    @Override
    public List<SectionResponseDTO> getAllSections() {
        List<Section> sections = sectionRepository.findAll();
        return sections.stream()
                .map(this::mapToSectionResponseDTO)
                .collect(Collectors.toList());
    }

    private SectionResponseDTO mapToSectionResponseDTO(Section section) {
        return SectionResponseDTO.builder()
                .id(section.getId())
                .name(section.getName())
                .url(section.getImageUrl())
                .build();
    }



    @Override
    public Section getSectionById(UUID id) {
        return sectionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));
    }

    @Override
    public SectionResponseDTO getSectionResponseById(UUID id) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));
        return sectionMapper.toResponseDTO(section);
    }

    // New method to get sections by store ID
    @Override
    public Section getSectionByStoreId(Long storeId) {
        Store store =storeService.getStoreById(storeId);
        Section section = sectionRepository.findById(store.getSection().getId()).orElseThrow(()->new RuntimeException("section not found"));
        return section;
    }

    @Override
    public SectionResponseDTO createSection(SectionRequestDTO sectionRequestDTO) {
        Section section = sectionMapper.toEntity(sectionRequestDTO);
        Section savedSection = sectionRepository.save(section);
        return sectionMapper.toResponseDTO(savedSection);
    }

    @Override
    public SectionResponseDTO updateSection(UUID sectionId, SectionRequestDTO sectionRequestDTO) {
        // Fetch the existing section by ID
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        // Check if another section with the same name exists
        Optional<Section> sectionWithSameName = sectionRepository.findByName(sectionRequestDTO.getName());

        // If another section with the same name exists and it's not the current section, throw an error
        if (sectionWithSameName.isPresent() && !sectionWithSameName.get().getId().equals(sectionId)) {
            throw new DuplicateEntityException("Section", "name", sectionRequestDTO.getName());
        }

        // Update the section fields
        section.setName(sectionRequestDTO.getName());
        section.setImageUrl(sectionRequestDTO.getImageUrl());

        // Save the updated section
        Section updatedSection = sectionRepository.save(section);

        return sectionMapper.toResponseDTO(updatedSection);
    }


    @Override
    public void deleteSection(UUID sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        // Check if any stores are related to this section
        List<Store> relatedStores = storeRepository.findBySectionId(sectionId);
        if (!relatedStores.isEmpty()) {
            throw new RuntimeException("Cannot delete section because it has related stores.");
        }

        // Proceed to delete if no stores are related to the section
        sectionRepository.delete(section);
    }
}
