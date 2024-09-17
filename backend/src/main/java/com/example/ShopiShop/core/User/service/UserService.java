package com.example.ShopiShop.core.User.service;

import com.example.ShopiShop.core.User.dto.UserLoginRequestDTO;
import com.example.ShopiShop.core.User.dto.UserLoginResponseDTO;
import com.example.ShopiShop.core.User.dto.UserSignupRequestDTO;
import com.example.ShopiShop.core.User.dto.UserSignupResponseDTO;
import com.example.ShopiShop.core.User.model.User;
import com.example.ShopiShop.core.User.repository.UserRepository;
import com.example.ShopiShop.security.JwtService;
import lombok.RequiredArgsConstructor;
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

    /**
     * Handles user registration.
     */
    public UserSignupResponseDTO register(UserSignupRequestDTO request) {
        // Check if a user with the provided email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new UserSignupResponseDTO("User with email " + request.getEmail() + " already exists.", null);
        }

        // Create a new user and encode the password
        User user = User.builder()
                .userName(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(request.getRole())
                .build();

        // Save the new user in the database
        userRepository.save(user);

        return new UserSignupResponseDTO("User registered successfully", String.valueOf(user.getId()));
    }

    /**
     * Handles user login and JWT token generation.
     */
    public UserLoginResponseDTO login(UserLoginRequestDTO request) {
        // Find the user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Validate the provided password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        // Generate JWT token using the user's details
        String token = jwtService.generateToken(user);

        return new UserLoginResponseDTO(token);
    }

    /**
     * Handles authentication with the AuthenticationManager.
     */
    public UserLoginResponseDTO authenticate(UserLoginRequestDTO request) {
        // Authenticate the user using AuthenticationManager
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // After authentication, find the user and generate the JWT token
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Generate the token
        String jwtToken = jwtService.generateToken(user);

        return UserLoginResponseDTO.builder()
                .token(jwtToken)
                .build();
    }
}
