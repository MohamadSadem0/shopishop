package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.exceptions.DuplicateEntityException;
import com.example.ShopiShop.servicesIMPL.SectionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        return ResponseEntity.ok(sectionService.createSection(sectionRequestDTO));
    }

    // Update an existing section
    @PutMapping("/admin/section/update/{id}")
    public ResponseEntity<?> updateSection(@PathVariable UUID sectionId, @RequestBody SectionRequestDTO sectionRequestDTO) {
        try {
            // Call service to update the section
            SectionResponseDTO updatedSection = sectionService.updateSection(sectionId, sectionRequestDTO);

            // Return success response with HTTP 200
            return ResponseEntity.ok(updatedSection);

        } catch (DuplicateEntityException ex) {
            // Return a bad request response with HTTP 400 for duplicate entity error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());

        } catch (RuntimeException ex) {
            // Return an internal server error response for any other issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the section.");
        }
    }
    // Delete a section
    @DeleteMapping("/admin/section/delete/{sectionId}")
    public ResponseEntity<?> deleteSection(@PathVariable UUID sectionId) {
        try {
            sectionService.deleteSection(sectionId);
            return ResponseEntity.ok("Section deleted successfully.");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
