package com.example.ShopiShop.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                        .requestMatchers("/api/**").permitAll()  // Your login and signup endpoints
                        .requestMatchers("/oauth2/**").permitAll()    // Allow Google OAuth2 flow
                        .anyRequest().authenticated()                 // All other requests require authentication
                )
//                .oauth2Login(Customizer.withDefaults())  // Enables Google OAuth2 login with default settings
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless sessions since you're using JWT
                .authenticationProvider(authenticationProvider)  // Use your custom authentication provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter to validate JWT tokens

        return http.build();
    }
}