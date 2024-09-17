package com.example.ShopiShop.modules.Section.controller;

import com.example.ShopiShop.modules.Section.dto.SectionResponseDTO;
import com.example.ShopiShop.modules.Section.dto.SectionMapper;
import com.example.ShopiShop.modules.Section.model.Section;
import com.example.ShopiShop.modules.Section.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // Allow requests from your frontend origin
@RequestMapping("/api/public/sections")
@RequiredArgsConstructor
public class SectionController {

    private final SectionRepository sectionRepository;
    private final SectionMapper sectionMapper;

    // Get all sections with their categories
    @GetMapping
    public ResponseEntity<List<SectionResponseDTO>> getAllSections() {
        List<Section> sections = sectionRepository.findAll();

        // Map the list of sections to a list of SectionResponseDTO
        List<SectionResponseDTO> response = sections.stream()
                .map(sectionMapper::mapToSectionResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
