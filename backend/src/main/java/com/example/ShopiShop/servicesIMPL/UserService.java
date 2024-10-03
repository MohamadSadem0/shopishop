package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.UserLoginRequestDTO;
import com.example.ShopiShop.dto.response.UserLoginResponseDTO;
import com.example.ShopiShop.dto.response.UserResponseDTO;
import com.example.ShopiShop.mappers.UserMapper;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.mappers.StoreMapper;
import com.example.ShopiShop.models.Store;
import com.example.ShopiShop.exceptions.UserAlreadyExistsException;
import com.example.ShopiShop.exceptions.UserNotFoundException;
import com.example.ShopiShop.models.User;
import com.example.ShopiShop.repositories.UserRepository;
import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.security.JwtService;
import lombok.RequiredArgsConstructor;
import com.example.ShopiShop.enums.UserRoleEnum;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final LocationServiceImpl locationService;
    private final StoreServiceImpl storeService;
    private final NotificationServiceImpl notificationService; // Inject NotificationService


    public List<UserResponseDTO> retrieveAllUsers() {
        // Retrieve all users from the repository
        List<User> users = userRepository.findAll();

        // Map each User entity to UserResponseDTO
        return users.stream()
                .map(UserMapper::toDTO) // Using the UserMapper to convert User to UserResponseDTO
                .collect(Collectors.toList());
    }

    public User register(UserSignupRequestDTO request) {
        validateSignupRequest(request);

        if (request.getRole() == UserRoleEnum.CUSTOMER) {
            User user = createUser(request);
            Location location = locationService.createLocation(request);
            user.setLocation(location);
            return userRepository.save(user);

        } else if (request.getRole() == UserRoleEnum.MERCHANT) {
            User user = createUser(request);

            notificationService.sendNotificationToSuperAdmin("New merchant registered: " + request.getEmail());
            Location location = locationService.createLocation(request);
            Store store = storeService.createStore(request, user, location);

            // Send notification for store creation
            String notificationMessage = "A new store '" + store.getName() + "' has been created by merchant '"
                    + user.getUsername() + "'. Approval is needed.";
            notificationService.sendNotificationToSuperAdmin(notificationMessage);

            return userRepository.save(user);
        }

        return null;
    }

    private void validateSignupRequest(UserSignupRequestDTO request) {
        if (request.getRole() == UserRoleEnum.SUPERADMIN) {
            throw new IllegalArgumentException("Cannot sign up with SUPER ADMIN role");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists.");
        }
    }

    private User createUser(UserSignupRequestDTO request) {
        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserLoginResponseDTO authenticate(UserLoginRequestDTO request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String jwtToken = jwtService.generateToken(user);
        UserLoginResponseDTO.LocationDTO locationDTO = buildLocationDTO(user);

        return switch (user.getUserRole()) {
            case CUSTOMER -> buildCustomerLoginResponse(jwtToken, user, locationDTO);
            case MERCHANT, SUPERADMIN -> buildMerchantLoginResponse(jwtToken, user);
            default -> throw new IllegalArgumentException("Unsupported role: " + user.getUserRole());
        };
    }

    private UserLoginResponseDTO.LocationDTO buildLocationDTO(User user) {
        Location location = user.getLocation();
        return location != null ? new UserLoginResponseDTO.LocationDTO(
                location.getAddressLine(),
                location.getCity(),
                location.getState(),
                location.getZipCode(),
                location.getCountry(),
                location.getLatitude(),
                location.getLongitude()
        ) : null;
    }

    private UserLoginResponseDTO buildCustomerLoginResponse(String jwtToken, User user, UserLoginResponseDTO.LocationDTO locationDTO) {
        return new UserLoginResponseDTO(
                jwtToken,
                user.getEmail(),
                user.getUserRole(),
                user.getUsername(),
                user.getPhoneNumber(),
                locationDTO,
                null
        );
    }

    private UserLoginResponseDTO buildMerchantLoginResponse(String jwtToken, User user) {
        if (user.getUserRole() == UserRoleEnum.SUPERADMIN) {
            // Superadmin doesn't need a store
            return new UserLoginResponseDTO(
                    jwtToken,
                    user.getEmail(),
                    user.getUserRole(),
                    user.getUsername(),
                    user.getPhoneNumber(),
                    null,  // No location for superadmin
                    null   // No store for superadmin
            );
        } else {
            // Continue with merchant logic
            Store store = storeService.getStoreByOwnerEmail(user.getEmail());
            Location location = store.getLocation();

            return new UserLoginResponseDTO(
                    jwtToken,
                    user.getEmail(),
                    user.getUserRole(),
                    user.getUsername(),
                    user.getPhoneNumber(),
                    new UserLoginResponseDTO.LocationDTO(
                            location.getAddressLine(),
                            location.getCity(),
                            location.getState(),
                            location.getZipCode(),
                            location.getCountry(),
                            location.getLatitude(),
                            location.getLongitude()
                    ),
                    StoreMapper.toDTO(store)
            );
        }
    }

}
