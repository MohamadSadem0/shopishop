package com.example.ShopiShop.Test;

import com.example.ShopiShop.core.User.dto.UserLoginRequestDTO;
import com.example.ShopiShop.core.User.dto.UserLoginResponseDTO;
import com.example.ShopiShop.core.User.dto.UserSignupRequestDTO;
import com.example.ShopiShop.core.User.dto.UserSignupResponseDTO;
import com.example.ShopiShop.core.User.service.UserService;
import com.example.ShopiShop.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)  // Disable security filters during testing
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private AuthenticationManager authenticationManager;

    @Test
    @Transactional(propagation = Propagation.NOT_SUPPORTED)  // Disable rollback for this test
    void testSignupSuccess() throws Exception {
        UserSignupRequestDTO request = new UserSignupRequestDTO("testUser", "test@example.com", "password123", null);
        UserSignupResponseDTO response = new UserSignupResponseDTO("User registered successfully", "1");

        when(userService.register(any(UserSignupRequestDTO.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully"))
                .andExpect(jsonPath("$.userId").value("1"));
    }
}

    // Test for successful login
//    @Test
//    void testLoginSuccess() throws Exception {
//        UserLoginRequestDTO request = new UserLoginRequestDTO("test@example.com", "password123");
//        UserLoginResponseDTO response = new UserLoginResponseDTO("fake-jwt-token");
//
//        // Mock the service layer to return a fake JWT token
//        when(userService.login(any(UserLoginRequestDTO.class))).thenReturn(response);
//
//        // Perform POST /login and verify the response
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())  // Expect 200 OK status
//                .andExpect(jsonPath("$.token").value("fake-jwt-token"));
//    }
//
//    // Test for login failure due to invalid credentials
//    @Test
//    void testLoginFailure() throws Exception {
//        UserLoginRequestDTO request = new UserLoginRequestDTO("test@example.com", "wrongpassword");
//
//        // Simulate the service throwing an exception for invalid credentials
//        when(userService.login(any(UserLoginRequestDTO.class)))
//                .thenThrow(new IllegalArgumentException("Invalid credentials"));
//
//        // Perform POST /login and verify the unauthorized (401) response
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isUnauthorized());  // Expect 401 Unauthorized status
//    }

