package com.example.ShopiShop.services;


import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.models.dto.SectionResponseDTO;

import java.util.List;
import java.util.UUID;

public interface SectionService {
    Section createSection(Section section);
    List<SectionResponseDTO> getAllSections();
    Section getSectionById(UUID id);
}