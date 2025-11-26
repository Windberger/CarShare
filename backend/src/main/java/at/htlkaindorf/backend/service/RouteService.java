package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.*;
import at.htlkaindorf.backend.exception.DuplicateEntryException;
import at.htlkaindorf.backend.exception.LoginException;
import at.htlkaindorf.backend.exception.ResourceNotFoundException;
import at.htlkaindorf.backend.exception.RouteException;
import at.htlkaindorf.backend.mapper.*;
import at.htlkaindorf.backend.pojos.Address;
import at.htlkaindorf.backend.pojos.Route;
import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.AddressRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import at.htlkaindorf.backend.repositories.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RouteService {

    private final RouteRepository routeRepository;
    private final AddressRepository addressRepository;
    private final UserAccountRepository userAccountRepository;
    private final RouteMapper routeMapper;
    private final AddressMapper addressMapper;
    private final UserAccountMapper userAccountMapper;
    private final RouteDetailMapper routeDetailMapper;
    private final CreateAddressMapper createAddressMapper;
    private final Random random = new Random();

    public Iterable<RouteDTO> getAllDriverRoutes(Long userId) {
        return routeRepository.getDriverRoutes(userId).stream().map(routeMapper::toDto).collect(Collectors.toList());
    }

    public Iterable<RouteDTO> getAllJoinedRoutes(Long userId) {
        return routeRepository.getJoinedRoutes(userId).stream().map(routeMapper::toDto).collect(Collectors.toList());
    }

    /**
     * This method creates a new Route with a unique Join Code
     * @author Mario Windberger
     * @since 30.05.2025
     * @param createRouteDTO
     * @return routeId
     */
    public Long createRoute(CreateRouteDTO createRouteDTO) {

        if(createRouteDTO.getAddresses().size() < 2){
            throw new RouteException("At least two addresses must be provided");
        }

        Address startAddress = createAddressMapper.toEntity(createRouteDTO.getAddresses().get(0));
        Address endAddress = createAddressMapper.toEntity(createRouteDTO.getAddresses().get(createRouteDTO.getAddresses().size() - 1));
        List<Address> middleAddresses = createRouteDTO.getAddresses().stream().filter(
                address -> !address.getPlaceId().equals(startAddress.getPlaceId()) && !address.getPlaceId().equals(endAddress.getPlaceId())
        ).map(createAddressMapper::toEntity).toList();

        Optional<Address> startAddressOptional = addressRepository.findByPlaceId(startAddress.getPlaceId());
        Optional<Address> endAddressOptional = addressRepository.findByPlaceId(endAddress.getPlaceId());
        Optional<UserAccount> driver = userAccountRepository.findById(createRouteDTO.getDriverId());

        if(startAddressOptional.isEmpty()) {
            addressRepository.save(startAddress);
            startAddressOptional = Optional.of(startAddress);
        }
        if(endAddressOptional.isEmpty()) {
            addressRepository.save(endAddress);
            endAddressOptional = Optional.of(endAddress);
        }


        StringBuilder joinCodeBuilder = new StringBuilder();
        String joinCode;

        int count = 0;
        do {
            String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (int i = 0; i < 8; i++) {
                joinCodeBuilder.append(characters.charAt(random.nextInt(characters.length())));
            }

            joinCode = joinCodeBuilder.toString();
            joinCodeBuilder.setLength(0);

            if (count == 10) {
                throw new RouteException("Error while creating route");
            }
            count++;
        } while (routeRepository.existsByJoinCode(joinCode));

        if (startAddressOptional.isPresent() && endAddressOptional.isPresent() && driver.isPresent()) {
            RouteDTO routeDTO = RouteDTO.builder()
                    .routeId(null)
                    .startAddress(startAddressOptional.get())
                    .endAddress(endAddressOptional.get())
                    .startTime(createRouteDTO.getStartTime())
                    .driver(userAccountMapper.toDto(driver.get()))
                    .joinCode(joinCode)
                    .build();

            try {
                routeRepository.save(routeMapper.toEntity(routeDTO));
            } catch (Exception e) {
                throw new DuplicateEntryException("This Route already exists");
            }
            return routeRepository.findByJoinCode(joinCode).getRouteId();
        } else {
            throw new ResourceNotFoundException("Route could not be created, because one of the following was not found: " +
                    "Start Address: " + startAddressOptional.isPresent() +
                    ", End Address: " + endAddressOptional.isPresent() +
                    ", Driver: " + driver.isPresent());
        }
    }


    public RouteDTO getRouteByJoinCode(String joinCode) {
        try {
            Route route = routeRepository.findByJoinCode(joinCode);
            log.info(route.getRouteId().toString());
            return routeMapper.toDto(route);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Route with join code " + joinCode + " was not found");
        }
    }

    /**
     * @author Johanna Hechtl
     * @since 13.05.2025
     * sucht Routen die man für die Detailansicht einer Route braucht
     * Dashboard --> click auf eine Route --> Detailansicht
     */
    public RouteDTO getRouteById(Long id) {

        Optional<Route> route = routeRepository.findById(id);

        if (route.isEmpty()) {
            throw new ResourceNotFoundException("Route with id " + id + " was not found");
        }

        return routeMapper.toDto(route.get());
    }

    public Boolean routeExisting(String joinCode) {
        try {
            Route route = routeRepository.findByJoinCode(joinCode);
            return route != null;
        } catch (Exception e) {
            return false;
        }
    }

    public void deleteRoute(Long routeId) {
        Optional<Route> route = routeRepository.findById(routeId);
        if (route.isEmpty()) {
            throw new ResourceNotFoundException("Route with id " + routeId + " was not found");
        }
        routeRepository.delete(route.get());
    }
}
