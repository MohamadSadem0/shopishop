package com.example.ShopiShop.core.User.controller;

import com.example.ShopiShop.core.User.dto.UserLoginRequestDTO;
import com.example.ShopiShop.core.User.dto.UserLoginResponseDTO;
import com.example.ShopiShop.core.User.dto.UserSignupRequestDTO;
import com.example.ShopiShop.core.User.dto.UserSignupResponseDTO;
import com.example.ShopiShop.core.User.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // Allow requests from your frontend origin
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponseDTO> signup(@RequestBody UserSignupRequestDTO request) {
        try {
            UserSignupResponseDTO response = userService.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Return a 409 Conflict if the user already exists
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new UserSignupResponseDTO(e.getMessage(), null));
        }
    }


//    @PostMapping("/login")
//    public ResponseEntity<UserLoginResponseDTO> login(@RequestBody UserLoginRequestDTO request) {
//        String response = userService.authenticate(request);
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> login(@RequestBody UserLoginRequestDTO request) {
        UserLoginResponseDTO response = userService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
