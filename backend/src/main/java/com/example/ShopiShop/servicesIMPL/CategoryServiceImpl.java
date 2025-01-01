package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.CategoryRequestDTO;
import com.example.ShopiShop.dto.response.CategoryResponseDTO;
import com.example.ShopiShop.mappers.CategoryMapper;
import com.example.ShopiShop.models.Category;
import com.example.ShopiShop.models.Section;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.CategoryRepository;
import com.example.ShopiShop.repositories.SectionRepository;
import com.example.ShopiShop.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final SectionServiceImpl sectionService;
    private final CategoryMapper categoryMapper; // Inject CategoryMapper
    private final StoreServiceImpl storeService;




    @Override
    public CategoryResponseDTO createCategory(UUID sectionId, CategoryRequestDTO categoryRequest) {
        Section section = sectionService.getSectionById(sectionId);
        Category category = categoryMapper.toEntity(categoryRequest, section);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toResponseDTO(savedCategory);
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        return categoryMapper.toResponseDTO(category);
    }
    @Override
    public List<CategoryResponseDTO> getCategoriesByStoreId(Long storeId) {


        // Fetch the sections associated with the store
        Section section = sectionService.getSectionByStoreId(storeId);

        // Collect categories from all sections
        List<Category> categories = section.getCategories();

        // Convert Category entities to CategoryResponseDTO using the mapper
        return categories.stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<CategoryResponseDTO> getCategoriesBySectionName(String sectionName) {


        // Fetch the sections associated with the store
        Section section = sectionService.getSectionByName(sectionName);

        // Collect categories from all sections
        List<Category> categories = section.getCategories();

        // Convert Category entities to CategoryResponseDTO using the mapper
        return categories.stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryResponseDTO> getCategoriesBySectionId(UUID sectionId) {
        Section section = sectionService.getSectionById(sectionId);
        return section.getCategories().stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryResponseDTO> getCategoriesBySection(Section section) {
        return categoryRepository.findBySection(section).stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO updateCategory(UUID id, CategoryRequestDTO categoryRequest) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        // Update fields from request DTO
        existingCategory.setName(categoryRequest.getName());
        existingCategory.setImageUrl(categoryRequest.getImageUrl());
//        existingCategory.set(categoryRequest.getImageUrl());

        Category updatedCategory = categoryRepository.save(existingCategory);
        return categoryMapper.toResponseDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(UUID id) {
        categoryRepository.deleteById(id);
    }
}
