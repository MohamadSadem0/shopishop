package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.request.CategoryRequestDTO;
import com.example.ShopiShop.dto.request.ProductRequestDTO;
import com.example.ShopiShop.dto.request.SectionRequestDTO;
import com.example.ShopiShop.dto.response.SectionResponseDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.models.Product;
import com.example.ShopiShop.servicesIMPL.CategoryServiceImpl;
import com.example.ShopiShop.servicesIMPL.ProductServiceImpl;
import com.example.ShopiShop.servicesIMPL.SectionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping()
@RequiredArgsConstructor
public class SectionController {

    private final SectionServiceImpl sectionService;

//    @RequestMapping("")
    // Get all sections
    @GetMapping("/public/sections")
    public ResponseEntity<List<SectionResponseDTO>> getAllSections() {
        return ResponseEntity.ok(sectionService.getAllSections());
    }
//    @RequestMapping("")

    // Get section by ID
    @GetMapping("/merchant/section/{id}")
    public ResponseEntity<SectionResponseDTO> getSectionById(@PathVariable UUID id) {
        return ResponseEntity.ok(sectionService.getSectionResponseById(id));
    }
    // Create a new section
//    @RequestMapping("")
    @PostMapping("/admin/section/create")
    public ResponseEntity<SectionResponseDTO> createSection(@RequestBody SectionRequestDTO sectionRequestDTO) {
        SectionResponseDTO sectionResponseDTO = sectionService.createSection(sectionRequestDTO);
        return ResponseEntity.ok(sectionResponseDTO);
    }





}
