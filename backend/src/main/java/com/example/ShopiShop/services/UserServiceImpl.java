//package com.example.ShopiShop.core.User.service;
//import com.example.ShopiShop.models.User;
//import com.example.ShopiShop.repositories.UserRepository;
//import com.example.ShopiShop.enums.UserRoleEnum;
//import com.example.ShopiShop.security.JwtService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtService jwtService;
//
//    public User register(String userName, String email, String password, UserRoleEnum role) {
//        // Check if the user already exists
//        if (userRepository.findByEmail(email).isPresent()) {
//            throw new IllegalArgumentException("User with email " + email + " already exists.");
//        }
//
//        User user = User.builder()
//                .userName(userName)
//                .email(email)
//                .password(passwordEncoder.encode(password)) // Encrypt the password
//                .userRole(role)
//                .build();
//
//        return userRepository.save(user);
//    }
//
//    public String login(String email, String password) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//
//        // Check if password matches
//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            throw new IllegalArgumentException("Invalid credentials");
//        }
//
//        // Generate a JWT token
//        return jwtService.generateToken(null, new org.springframework.security.core.userdetails.User(
//                user.getEmail(),
//                user.getPassword(),
//                new ArrayList<>()
//        ));
//    }
//}
