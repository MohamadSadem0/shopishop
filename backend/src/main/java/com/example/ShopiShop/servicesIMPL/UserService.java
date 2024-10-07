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
import com.example.ShopiShop.models.VerificationToken;
import com.example.ShopiShop.repositories.UserRepository;
import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.repositories.VerificationTokenRepository;
import com.example.ShopiShop.security.JwtService;
import lombok.RequiredArgsConstructor;
import com.example.ShopiShop.enums.UserRoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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
    private final EmailService emailService;
    private final VerificationTokenRepository tokenRepository;
    @Autowired
    private JavaMailSender mailSender;


    public List<UserResponseDTO> retrieveAllUsers() {
        // Retrieve all users from the repository
        List<User> users = userRepository.findAll();

        // Map each User entity to UserResponseDTO
        return users.stream()
                .map(UserMapper::toDTO) // Using the UserMapper to convert User to UserResponseDTO
                .collect(Collectors.toList());
    }

    public Boolean isUserAvailable(String email){
        return userRepository.findByEmail(email).isEmpty();
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
            emailService.sendVerificationEmail(request.getEmail(), "Verify Your Email", "Please verify your email by clicking here: [link]");

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
        sendConfirmationEmail(user);
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

    public UserLoginResponseDTO.LocationDTO buildLocationDTO(User user) {
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

    public UserLoginResponseDTO buildCustomerLoginResponse(String jwtToken, User user, UserLoginResponseDTO.LocationDTO locationDTO) {
        return new UserLoginResponseDTO(
                jwtToken,
                user.getEmail(),
                user.getUserRole(),
                user.getUsername(),
//                user.getPhoneNumber(),
                locationDTO,
                null
        );
    }

    public UserLoginResponseDTO buildMerchantLoginResponse(String jwtToken, User user) {
        if (user.getUserRole() == UserRoleEnum.SUPERADMIN) {
            // Superadmin doesn't need a store
            return new UserLoginResponseDTO(
                    jwtToken,
                    user.getEmail(),
                    user.getUserRole(),
                    user.getUsername(),
//                    user.getPhoneNumber(),
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
//                    user.getPhoneNumber(),
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

    private void sendConfirmationEmail(User user) {
        String subject = "Confirm your email";
        String confirmationUrl = "http://localhost:8080/confirm?token=" + user.getConfirmationToken();
        String message = "Please confirm your email by clicking the link: " + confirmationUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }

    public List<UserLoginResponseDTO> retrieveAndCleanMerchantsWithoutStore() {
        // Fetch all merchants (users with MERCHANT role)
        List<User> merchants = userRepository.findByUserRole(UserRoleEnum.MERCHANT);

        // Filter merchants who do not have a store and delete them
        List<User> merchantsWithStore = merchants.stream()
                .filter(merchant -> {
                    Store store = storeService.getStoreByOwnerEmail(merchant.getEmail());
                    if (store == null) {
                        // No store found for this merchant, delete them
                        userRepository.delete(merchant);
                        return false;  // Exclude this merchant from the result list
                    }
                    return true;  // Include this merchant in the result list
                })
                .collect(Collectors.toList());

        // Map remaining merchants (with stores) to UserLoginResponseDTO
        return merchantsWithStore.stream()
                .map(merchant -> {
                    String jwtToken = null;  // No token for this request
                    Location location = merchant.getLocation();
                    UserLoginResponseDTO.LocationDTO locationDTO = buildLocationDTO(merchant);

                    return buildMerchantLoginResponse(jwtToken, merchant);
                })
                .collect(Collectors.toList());
    }



}
