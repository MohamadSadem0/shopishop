package com.example.ShopiShop.controllers;

import com.example.ShopiShop.dto.response.UserResponseDTO;
import com.example.ShopiShop.servicesIMPL.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // Allow requests from your frontend origin
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.retrieveAllUsers();
        return ResponseEntity.ok(users);
    }
}

