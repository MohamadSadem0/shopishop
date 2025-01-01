package com.example.ShopiShop.controllers;


import com.example.ShopiShop.dto.request.UserLoginRequestDTO;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.dto.response.UserLoginResponseDTO;
import com.example.ShopiShop.dto.response.UserSignupResponseDTO;
import com.example.ShopiShop.exceptions.UserAlreadyExistsException;
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
@RequestMapping("public/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponseDTO> signup(@RequestBody UserSignupRequestDTO request) {
        try {
            UserSignupResponseDTO response = userMapper.toSignupResponse(
                    userService.register(request), "User registered successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException | UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserSignupResponseDTO(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserSignupResponseDTO("An unexpected error occurred: " + e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> login(@RequestBody UserLoginRequestDTO request) {
        UserLoginResponseDTO response = userService.authenticate(request);
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/confirm")
//    public ResponseEntity<String> confirmUser(@RequestParam("token") String token) {
//        try {
//            userService.confirmUser(token);
//            return ResponseEntity.ok("Email confirmed successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Invalid token: " + e.getMessage());
//        }
//    }
}
