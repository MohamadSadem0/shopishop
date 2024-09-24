package com.example.ShopiShop.services.IMPL;

import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.repositories.StoreRepository;
import com.example.ShopiShop.models.dto.UserLoginRequestDTO;
import com.example.ShopiShop.models.dto.UserLoginResponseDTO;
import com.example.ShopiShop.models.dto.UserMapper;
import com.example.ShopiShop.models.dto.UserSignupRequestDTO;
import com.example.ShopiShop.exceptions.UserAlreadyExistsException;
import com.example.ShopiShop.exceptions.UserNotFoundException;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.UserRepository;
import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.repositories.LocationRepository;
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
    private final LocationRepository locationRepository;

    public User register(UserSignupRequestDTO request) {
        if (request.getRole() == UserRoleEnum.SUPERADMIN) {
            throw new IllegalArgumentException("Cannot sign up with SUPEwekdnfuyweg 9RADMIN role");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists.");
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        Location location = Location.builder()
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .addressLine(request.getAddressLine())
                .city(request.getCity())
                .state(request.getState())
                .zipCode(request.getZipCode())
                .country(request.getCountry())
                .build();

        Location savedLocation = locationRepository.save(location);

        if (request.getRole() == UserRoleEnum.MERCHANT) {
            Store store = Store.builder()
                    .name(request.getBusinessName() != null ? request.getBusinessName() : (request.getName() + "'s Store"))
                    .location(savedLocation)
                    .owner(savedUser)
                    .isApproved(false)
                    .build();

            storeRepository.save(store);
            savedUser.setLocation(savedLocation);
            userRepository.save(savedUser);
        } else {
            savedUser.setLocation(savedLocation);
            userRepository.save(savedUser);
        }

        return savedUser;
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

        UserLoginResponseDTO.LocationDTO locationDTO = null;
        if (user.getLocation() != null) {
            locationDTO = new UserLoginResponseDTO.LocationDTO(
                    user.getLocation().getAddressLine(),
                    user.getLocation().getCity(),
                    user.getLocation().getState(),
                    user.getLocation().getZipCode(),
                    user.getLocation().getCountry(),
                    user.getLocation().getLatitude(),
                    user.getLocation().getLongitude()
            );
        }

        return new UserLoginResponseDTO(
                jwtToken,
                user.getEmail(),
                user.getUserRole().toString(),
                user.getUsername(),
                user.getPhoneNumber(),  // Add phone number to response
                locationDTO // Add location to response
        );
    }
}
