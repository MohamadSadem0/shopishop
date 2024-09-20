package com.example.ShopiShop.core.User.service;

import com.example.ShopiShop.core.User.dto.UserLoginRequestDTO;
import com.example.ShopiShop.core.User.dto.UserLoginResponseDTO;
import com.example.ShopiShop.core.User.dto.UserMapper;
import com.example.ShopiShop.core.User.dto.UserSignupRequestDTO;
import com.example.ShopiShop.core.User.exception.InvalidCredentialsException;
import com.example.ShopiShop.core.User.exception.UserAlreadyExistsException;
import com.example.ShopiShop.core.User.exception.UserNotFoundException;
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
    private final UserMapper userMapper;

    public User register(UserSignupRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists.");
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword())); // encode password
        userRepository.save(user);

        return user;
    }

    public UserLoginResponseDTO authenticate(UserLoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String jwtToken = jwtService.generateToken(user);
        return new UserLoginResponseDTO(jwtToken, user.getEmail(), user.getUserRole().toString(), user.getUsername() );
    }
}
