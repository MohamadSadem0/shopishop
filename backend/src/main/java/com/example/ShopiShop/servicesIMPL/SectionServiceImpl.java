package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.mappers.SectionMapper;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.services.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final SectionMapper sectionMapper;
    private final StoreServiceImpl storeService;

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
    public SectionResponseDTO createSection(SectionRequestDTO sectionRequestDTO) {
        Section section = sectionMapper.toEntity(sectionRequestDTO);
        Section savedSection = sectionRepository.save(section);
        return sectionMapper.toResponseDTO(savedSection);
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
}
