package com.example.ShopiShop.services;


import com.example.ShopiShop.models.Section;

import java.util.List;
import java.util.UUID;

public interface SectionService {
    Section createSection(Section section);
    List<Section> getAllSections();
    Section getSectionById(UUID id);
}