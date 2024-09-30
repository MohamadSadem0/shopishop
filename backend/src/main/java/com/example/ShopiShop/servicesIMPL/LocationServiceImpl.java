package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.models.Location;
import com.example.ShopiShop.dto.request.UserSignupRequestDTO;
import com.example.ShopiShop.repositories.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class LocationServiceImpl {
    private final LocationRepository locationRepository;

    public Location createLocation(UserSignupRequestDTO request) {
        Location location = Location.builder()
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .addressLine(request.getAddressLine())
                .city(request.getCity())
                .state(request.getState())
                .zipCode(request.getZipCode())
                .country(request.getCountry())
                .build();
        return locationRepository.save(location);
    }
}
