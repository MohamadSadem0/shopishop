package com.example.ShopiShop.core.User.service;

import com.example.ShopiShop.core.Store.model.Store;
import com.example.ShopiShop.core.Store.repository.StoreRepository;
import com.example.ShopiShop.core.User.dto.UserLoginRequestDTO;
import com.example.ShopiShop.core.User.dto.UserLoginResponseDTO;
import com.example.ShopiShop.core.User.dto.UserMapper;
import com.example.ShopiShop.core.User.dto.UserSignupRequestDTO;
import com.example.ShopiShop.core.User.exception.UserAlreadyExistsException;
import com.example.ShopiShop.core.User.exception.UserNotFoundException;
import com.example.ShopiShop.core.User.model.User;
import com.example.ShopiShop.core.User.repository.UserRepository;
import com.example.ShopiShop.modules.Location.model.Location;
import com.example.ShopiShop.modules.Location.repository.LocationRepository;
import com.example.ShopiShop.security.JwtService;
import lombok.RequiredArgsConstructor;
import com.example.ShopiShop.enums.UserRoleEnum;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final StoreRepository storeRepository;
    private final LocationRepository locationRepository; // Make sure you have this repository

    public User register(UserSignupRequestDTO request) {
        // Prevent signing up with SUPER_ADMIN role
        if (request.getRole() == UserRoleEnum.SUPER_ADMIN) {
            throw new IllegalArgumentException("Cannot sign up with SUPER_ADMIN role");
        }

        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists.");
        }

        // Map DTO to User entity
        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword())); // encode password

        // Save the user first before creating any dependent entities like Store
        User savedUser = userRepository.save(user);

        // Create a Location entity based on request data
        Location location = Location.builder()
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .addressLine(request.getAddressLine())
                .city(request.getCity())
                .state(request.getState())
                .zipCode(request.getZipCode())
                .country(request.getCountry())
                .build();

        // Save the location entity first
        Location savedLocation = locationRepository.save(location);

        // For merchants, create a new store
        if (request.getRole() == UserRoleEnum.MERCHANT) {
            Store store = Store.builder()
                    .name(request.getBusinessName() != null ? request.getBusinessName() : (request.getName() + "'s Store"))
                    .location(savedLocation)  // Associate the saved location with the store
                    .owner(savedUser)          // Associate the saved user with the store
                    .isApproved(false)         // Store approval logic
                    .build();

            // Save the store after saving the user and location
            storeRepository.save(store);

            // Optionally, set the same location for the user
            savedUser.setLocation(savedLocation);
            userRepository.save(savedUser); // Update user with location
        } else {
            // For customers, associate the location directly with the user
            savedUser.setLocation(savedLocation);
            userRepository.save(savedUser);
        }

        return savedUser;
    }

    public UserLoginResponseDTO authenticate(UserLoginRequestDTO request) {
        // Authenticate the user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Find the user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Generate a JWT token
        String jwtToken = jwtService.generateToken(user);

        // Return the login response with token
        return new UserLoginResponseDTO(jwtToken, user.getEmail(), user.getUserRole().toString(), user.getUsername());
    }
}
