package com.example.ShopiShop.data;

import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
import com.example.ShopiShop.modules.Section.model.Section;
import com.example.ShopiShop.modules.Section.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final SectionRepository sectionRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        // Predefined sections with images
        Map<String, String> sections = new HashMap<>();
        sections.put("Food", "https://example.com/images/food.jpg");
        sections.put("Fresh Flowers", "https://example.com/images/flowers.jpg");
        sections.put("Laundry", "https://example.com/images/laundry.jpg");
        sections.put("Market", "https://example.com/images/market.jpg");
        sections.put("Butler", "https://example.com/images/butler.jpg");
        sections.put("Selfcare", "https://example.com/images/selfcare.jpg");
        sections.put("Car Service", "https://example.com/images/carservice.jpg");
        sections.put("Cleaning", "https://example.com/images/cleaning.jpg");
        sections.put("Gas", "https://example.com/images/gas.jpg");
        sections.put("Health", "https://example.com/images/health.jpg");

        // Predefined categories for each section
        Map<String, List<String>> sectionCategories = new HashMap<>();
        sectionCategories.put("Food", Arrays.asList("American", "Bakeries", "Burgers", "Pizza", "Sushi", "Chinese", "Indian"));
        sectionCategories.put("Fresh Flowers", Arrays.asList("Roses", "Tulips", "Lilies", "Orchids"));
        sectionCategories.put("Laundry", Arrays.asList("Dry Cleaning", "Wash & Fold", "Ironing", "Pickup & Delivery"));
        sectionCategories.put("Market", Arrays.asList("Groceries", "Vegetables", "Fruits", "Dairy Products"));
        sectionCategories.put("Butler", Arrays.asList("Housekeeping", "Errands", "Personal Assistant"));
        sectionCategories.put("Selfcare", Arrays.asList("Spa", "Haircut", "Manicure", "Pedicure", "Massage"));
        sectionCategories.put("Car Service", Arrays.asList("Oil Change", "Car Wash", "Detailing", "Tire Service"));
        sectionCategories.put("Cleaning", Arrays.asList("House Cleaning", "Office Cleaning", "Deep Cleaning", "Carpet Cleaning"));
        sectionCategories.put("Gas", Arrays.asList("Fuel Delivery", "Car Charging"));
        sectionCategories.put("Health", Arrays.asList("Doctor Visit", "Nurse Care", "Pharmacy Delivery", "Lab Tests"));

        // Predefined category images
        Map<String, String> categoryImages = new HashMap<>();
        categoryImages.put("American", "https://example.com/images/american.jpg");
        categoryImages.put("Bakeries", "https://example.com/images/bakeries.jpg");
        categoryImages.put("Burgers", "https://example.com/images/burgers.jpg");
        categoryImages.put("Pizza", "https://example.com/images/pizza.jpg");
        categoryImages.put("Sushi", "https://example.com/images/sushi.jpg");
        categoryImages.put("Chinese", "https://example.com/images/chinese.jpg");
        categoryImages.put("Indian", "https://example.com/images/indian.jpg");

        // Insert sections and categories with image URLs
        sections.forEach((sectionName, sectionImageUrl) -> {
            Section section = sectionRepository.findByName(sectionName)
                    .orElseGet(() -> sectionRepository.save(new Section(null, sectionName, sectionImageUrl, null)));

            // Get the categories for the current section and add them if they don't exist
            sectionCategories.get(sectionName).forEach(categoryName -> {
                if (categoryRepository.findAll().stream().noneMatch(cat -> cat.getName().equals(categoryName))) {
                    String categoryImageUrl = categoryImages.getOrDefault(categoryName, "https://example.com/images/default.jpg");
                    Category category = new Category(null, categoryName, categoryImageUrl, section);
                    categoryRepository.save(category);
                }
            });
        });

        System.out.println("Default sections and categories with images added to the database!");
    }
}
