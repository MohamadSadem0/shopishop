package com.example.ShopiShop.controllers;


import com.example.ShopiShop.dto.request.UserLoginRequestDTO;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.dto.response.UserLoginResponseDTO;
import com.example.ShopiShop.dto.response.UserSignupResponseDTO;
import com.example.ShopiShop.mappers.UserMapper;
import com.example.ShopiShop.servicesIMPL.UserService;
import com.example.ShopiShop.enums.UserRoleEnum;
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
    private final UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponseDTO> signup(@RequestBody UserSignupRequestDTO request ) {
        if (request.getRole() == UserRoleEnum.SUPERADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new UserSignupResponseDTO("Cannot sign up as SUPER_ADMIN", null));
        }
        try {
            // Use the mapper to register the user and create a response
            UserSignupResponseDTO response = userMapper.toSignupResponse(
                    userService.register(request), "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Return a 409 Conflict if the user already exists
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new UserSignupResponseDTO(e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> login(@RequestBody UserLoginRequestDTO request) {

        // Use the service to authenticate the user
        UserLoginResponseDTO response = userService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
