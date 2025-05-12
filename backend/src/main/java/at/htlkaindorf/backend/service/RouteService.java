package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.dto.CreateRouteDTO;
import at.htlkaindorf.backend.dto.RouteDTO;
import at.htlkaindorf.backend.dto.UserAccountDTO;
import at.htlkaindorf.backend.mapper.AddressMapper;
import at.htlkaindorf.backend.mapper.RouteMapper;
import at.htlkaindorf.backend.pojos.Address;
import at.htlkaindorf.backend.pojos.Route;
import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.AddressRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import at.htlkaindorf.backend.repositories.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
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

    public Iterable<RouteDTO> getAllDriverRoutes(Long userId) {
        return routeRepository.getDriverRoutes(userId).stream().map(routeMapper::toDto).collect(Collectors.toList());
    }

    public Iterable<RouteDTO> getAllJoinedRoutes(Long userId) {
        return routeRepository.getJoinedRoutes(userId).stream().map(routeMapper::toDto).collect(Collectors.toList());
    }

    public Optional<RouteDTO> createRoute(RouteDTO routeDTO) {
//        try {
//            Optional<Address> startAddress = addressRepository.findById(createRouteDTO.getStartAddressId());
//            Optional<Address> endAddress = addressRepository.findById(createRouteDTO.getEndAddressId());
//            Optional<UserAccount> driver = userAccountRepository.findById(createRouteDTO.getDriverId());
//
//            if(startAddress.isPresent() && endAddress.isPresent() && driver.isPresent()) {
//                RouteDTO routeDTO = new RouteDTO(
//                        createRouteDTO.getRouteId(),
//                        addressMapper.toDto()
//                        endAddress.get(),
//                        createRouteDTO.getStartTime(),
//                        driver.get(),
//                        createRouteDTO.getJoinCode()
//                );
//            }
//
//            route = repository.save(route);
//        } catch (Exception e) {
//            log.info("Error creating Route: " + e);
//        }
        return Optional.of(new RouteDTO(1L,
                new AddressDetailDTO(1L, 123, "Test Street", "1234", "Test City"),
                new AddressDetailDTO(2L, 123, "Another Street", "5678", "Another City"),
                routeDTO.getStartTime(),
                new UserAccountDTO(1L, "testuser", "password", "234"),
                routeDTO.getJoinCode()
        ));
    }
}
