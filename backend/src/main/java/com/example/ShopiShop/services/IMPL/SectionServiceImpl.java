package com.example.ShopiShop.services.IMPL;

import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.models.dto.SectionResponseDTO;
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

    @Override
    public Section createSection(Section section) {
        return sectionRepository.save(section);
    }

    @Override
    public List<SectionResponseDTO> getAllSections() {
        // Fetch all Section entities
        List<Section> sections = sectionRepository.findAll();

        // Map Section entities to SectionResponseDTOs
        return sections.stream()
                .map(this::mapToSectionResponseDTO)  // Mapping logic
                .collect(Collectors.toList());
    }
    // Helper method to map Section to SectionResponseDTO
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
}
