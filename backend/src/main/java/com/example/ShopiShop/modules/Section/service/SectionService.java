package com.example.ShopiShop.modules.Section.service;


import com.example.ShopiShop.modules.Section.model.Section;

import java.util.List;
import java.util.UUID;

public interface SectionService {
    Section createSection(Section section);
    List<Section> getAllSections();
    Section getSectionById(UUID id);
}