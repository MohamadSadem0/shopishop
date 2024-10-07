package com.example.ShopiShop.services;


import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.dto.response.SectionResponseDTO;

import java.util.List;
import java.util.UUID;

public interface    SectionService {
    Section createSection(Section section);
    public SectionResponseDTO updateSection(UUID id, SectionRequestDTO sectionRequestDTO);
    public void deleteSection(UUID id);
    List<SectionResponseDTO> getAllSections();
    SectionResponseDTO  getSectionResponseById(UUID id);
    Section  getSectionById(UUID id);
    public Section getSectionByStoreId(Long storeId);
    SectionResponseDTO createSection(SectionRequestDTO sectionRequestDTO);
//    Section getSectionByStore(Store store);

}