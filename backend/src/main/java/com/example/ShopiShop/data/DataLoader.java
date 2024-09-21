package com.example.ShopiShop.data;

import com.example.ShopiShop.core.User.model.User;
import com.example.ShopiShop.core.User.repository.UserRepository;
import com.example.ShopiShop.enums.UserRoleEnum;
import com.example.ShopiShop.modules.Category.model.Category;
import com.example.ShopiShop.modules.Category.repository.CategoryRepository;
import com.example.ShopiShop.modules.Section.model.Section;
import com.example.ShopiShop.modules.Section.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {


        if (userRepository.findByEmail("superadmin@example.com").isEmpty()) {
            User superAdmin = User.builder()
                    .userName("Super Admin")
                    .email("superadmin@example.com")
                    .password(passwordEncoder.encode("SuperSecurePassword"))  // Set a secure password
                    .userRole(UserRoleEnum.SUPER_ADMIN)  // Add SUPER_ADMIN role
                    .build();
            userRepository.save(superAdmin);
        }
        // Predefined sections with images
        Map<String, String> sections = new HashMap<>();
        sections.put("Food", "");
        sections.put("Fresh", "https://i.imgur.com/2Rmisnj.png");
        sections.put("Flowers", "https://i.imgur.com/t9KWxcq");
        sections.put("Laundry", "https://i.imgur.com/ZyBBIuF");
        sections.put("Market", "https://i.imgur.com/3K5xYYm");
        sections.put("Butler", "https://i.imgur.com/t9KWxcq");
        sections.put("Selfcare", "https://i.imgur.com/t9KWxcq");
        sections.put("Car Service", "https://i.imgur.com/t9KWxcq");
        sections.put("Cleaning", "https://i.imgur.com/t9KWxcq");
        sections.put("Gas", "https://i.imgur.com/t9KWxcq");
        sections.put("Health", "https://i.imgur.com/t9KWxcq");

        // Predefined categories for each section
        Map<String, List<String>> sectionCategories = new HashMap<>();
        sectionCategories.put("Food", Arrays.asList("American", "Bakeries", "Burgers", "Pizza", "Sushi", "Chinese", "Indian"));
        sectionCategories.put("Flowers", Arrays.asList("Roses", "Tulips", "Lilies", "Orchids")); // Changed from "Fresh Flowers" to "Flowers"
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
            List<String> categories = sectionCategories.get(sectionName);
            if (categories != null) {  // Check to avoid null pointer exception
                categories.forEach(categoryName -> {
                    if (categoryRepository.findAll().stream().noneMatch(cat -> cat.getName().equals(categoryName))) {
                        String categoryImageUrl = categoryImages.getOrDefault(categoryName, "https://example.com/images/default.jpg");
                        Category category = new Category(null, categoryName, categoryImageUrl, section);
                        categoryRepository.save(category);
                    }
                });
            } else {
                System.out.println("No categories found for section: " + sectionName);
            }
        });

        System.out.println("Default sections and categories with images added to the database!");
    }
}
