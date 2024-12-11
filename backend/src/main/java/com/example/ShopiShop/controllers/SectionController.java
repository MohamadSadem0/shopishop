package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.dto.response.SectionResponseWithCategoriesDTO;
import com.example.ShopiShop.exceptions.DuplicateEntityException;
import com.example.ShopiShop.exceptions.EntityNotFoundException;
import com.example.ShopiShop.servicesIMPL.SectionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;



@RestController
@RequestMapping()
@RequiredArgsConstructor
public class SectionController {

    private final SectionServiceImpl sectionService;

    // Get all sections
    @GetMapping("/public/sections")
    public ResponseEntity<List<SectionResponseDTO>> getAllSections() {
        return ResponseEntity.ok(sectionService.getAllSections());
    }

    // Get section by ID
    @GetMapping("/public/section/{id}")
    public ResponseEntity<SectionResponseDTO> getSectionById(@PathVariable UUID id) {
        return ResponseEntity.ok(sectionService.getSectionResponseById(id));
    }

    // Create a new section
    @PostMapping("/admin/section/create")
    public ResponseEntity<SectionResponseDTO> createSection(@RequestBody SectionRequestDTO sectionRequestDTO) {
        try {
            return ResponseEntity.ok(sectionService.createSection(sectionRequestDTO));
        } catch (DuplicateEntityException ex) {
            throw new DuplicateEntityException("Section already exists.");
        }
    }

    // Update an existing section
    @PutMapping("/admin/section/update/{sectionId}")
    public ResponseEntity<SectionResponseDTO> updateSection(
            @PathVariable("sectionId") UUID sectionId,
            @RequestBody SectionRequestDTO sectionRequestDTO) {
        try {
            return ResponseEntity.ok(sectionService.updateSection(sectionId, sectionRequestDTO));
        } catch (DuplicateEntityException ex) {
            throw new DuplicateEntityException("Section already exists.");

        } catch (EntityNotFoundException ex) {
            throw new EntityNotFoundException("Section not found.");
        } catch (RuntimeException ex) {
            throw new RuntimeException("An error occurred while updating the section.");
        }
    }

    // Delete a section
    @DeleteMapping("/admin/section/delete/{sectionId}")
    public ResponseEntity<String> deleteSection(@PathVariable UUID sectionId) {
        try {
            sectionService.deleteSection(sectionId);
            return ResponseEntity.ok("Section deleted successfully.");
        } catch (EntityNotFoundException ex) {
            throw new EntityNotFoundException("Section not found." +ex );
        }
    }

    @GetMapping("/public/sections/with-categories")
    public ResponseEntity<List<SectionResponseWithCategoriesDTO>> getAllSectionsWithCategories() {
        return ResponseEntity.ok(sectionService.getAllSectionsWithCategories());
    }
}
