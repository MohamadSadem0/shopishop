package com.example.ShopiShop.security;

import com.example.ShopiShop.enums.UserRoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF since you are using JWT
                .authorizeHttpRequests(authorize -> authorize
                        // Allow unauthenticated access to auth endpoints
                        .requestMatchers("public/**").permitAll()  // Your login and signup endpoints
                        .requestMatchers("/oauth2/**").permitAll()    // Allow Google OAuth2 flow
                        .requestMatchers("/ws/**").permitAll()        // Allow WebSocket endpoints without authentication
                        .requestMatchers("/superAdmin/**").hasAuthority(UserRoleEnum.SUPERADMIN.name()) // Using the enum superAdmin
                        .requestMatchers("/merchant/**").hasAuthority(UserRoleEnum.MERCHANT.name()) // Using the enum Costumer
                        .anyRequest().authenticated()                 // All other requests require authentication
                )
                .cors(Customizer.withDefaults())  // Enable CORS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless sessions since you're using JWT
                .authenticationProvider(authenticationProvider)  // Use your custom authentication provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter to validate JWT tokens

        return http.build();
    }

    // Define a CORS filter bean to allow WebSocket CORS requests
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow all origins, headers, and methods for testing; modify as needed
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");  // Frontend origin
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
