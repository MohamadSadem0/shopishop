package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.response.UserLoginResponseDTO;

import com.example.ShopiShop.dto.response.UserResponseDTO;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.*;
import com.example.ShopiShop.servicesIMPL.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/admin/all")
    public ResponseEntity<List<UserLoginResponseDTO>> getAllUsers() {
        // Fetch all users from the repository
        List<User> users = userRepository.findAll();

        // For each user, build the response similar to login response
        List<UserLoginResponseDTO> userResponses = users.stream()
                .map(user -> {
                    UserLoginResponseDTO.LocationDTO locationDTO = userService.buildLocationDTO(user);

                    return switch (user.getUserRole()) {
                        case CUSTOMER -> userService.buildCustomerLoginResponse(null, user, locationDTO);
                        case MERCHANT, SUPERADMIN -> userService.buildMerchantLoginResponse(null, user);
//                        default -> throw new IllegalArgumentException("Unsupported role: " + user.getUserRole());
                    };
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(userResponses);
    }
    @GetMapping("public/merchants-with-stores")
    public ResponseEntity<List<UserLoginResponseDTO>> getMerchantsWithStores() {
        // Call the service to retrieve merchants who have stores
        List<UserLoginResponseDTO> merchantsWithStores = userService.retrieveAndCleanMerchantsWithoutStore();

        // Return the response wrapped in ResponseEntity
        return ResponseEntity.ok(merchantsWithStores);
    }
@GetMapping("/admin/user")
public ResponseEntity<UserLoginResponseDTO> getUserByEmail(@RequestParam String email) {
    // Fetch user by email
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Generate response similar to login response
    UserLoginResponseDTO.LocationDTO locationDTO = userService.buildLocationDTO(user);

    UserLoginResponseDTO responseDTO = switch (user.getUserRole()) {
        case CUSTOMER -> userService.buildCustomerLoginResponse(null, user, locationDTO);
        case MERCHANT, SUPERADMIN -> userService.buildMerchantLoginResponse(null, user);
//        default -> throw new IllegalArgumentException("Unsupported role: " + user.getUserRole());
    };

    return ResponseEntity.ok(responseDTO);
}

    @PostMapping("/public/users/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestBody Map<String, String> requestBody){
        String email = requestBody.get("email");
        boolean isAvailable = userService.isUserAvailable(email);
        return ResponseEntity.ok(isAvailable);
    }

//    @PostMapping("/public/users/verify-email")
//    public ResponseEntity<String> verifyUserEmail(@RequestParam String token) {
//        boolean verificationStatus = userService.verifyUser(token);
//        if (verificationStatus) {
//            return ResponseEntity.ok("Email successfully verified.");
//        } else {
//            return ResponseEntity.badRequest().body("Invalid or expired verification link.");
//        }
//    }

    @GetMapping("/admin/merchants/clean")
    public ResponseEntity<List<UserLoginResponseDTO>> cleanMerchantsWithoutStore() {
        List<UserLoginResponseDTO> cleanedMerchants = userService.retrieveAndCleanMerchantsWithoutStore();
        return ResponseEntity.ok(cleanedMerchants);
    }


}

