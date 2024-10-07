package com.example.ShopiShop.controllers;


import com.example.ShopiShop.dto.request.UserLoginRequestDTO;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.dto.response.UserLoginResponseDTO;
import com.example.ShopiShop.dto.response.UserSignupResponseDTO;
import com.example.ShopiShop.mappers.UserMapper;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.UserRepository;
import com.example.ShopiShop.servicesIMPL.UserService;
import com.example.ShopiShop.enums.UserRoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final UserMapper userMapper;
    @Autowired
    private UserRepository userRepository;

//    @RequestMapping("/")

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

//    @PostMapping("/api/auth/google")
//    public String googleAuth(OAuth2AuthenticationToken token) {
//        // OAuth2AuthenticationToken holds the details of the authenticated user
//        String email = token.getPrincipal().getAttribute("email");
//        String name = token.getPrincipal().getAttribute("name");
//
//        // Process the user details, check if user exists, and handle accordingly
//        userService.processUserDetails(name, email);
//        return "User authenticated with Google successfully";
//    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmUser(@RequestParam("token") String token) {
        // Find the user with the given confirmation token
        User user = userRepository.findByConfirmationToken(token);

        if (user != null) {
            // Activate the user and save
            user.setEnabled(true);
            user.setConfirmationToken(null);
            userRepository.save(user);

            return ResponseEntity.ok("Email confirmed successfully!");
        } else {
            return ResponseEntity.badRequest().body("Invalid token");
        }
    }
}
