package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.RouteDTO;
import at.htlkaindorf.backend.mapper.RouteMapper;
import at.htlkaindorf.backend.pojos.Route;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RouteService {

    private final RouteRepository repository;
    private final RouteMapper mapper;


    public Iterable<RouteDTO> getAllDriverRoutes(Long userId) {

        return repository.getDriverRoutes(userId).stream().map(mapper::toDto).collect(Collectors.toList());


    }

    public Iterable<RouteDTO> getAllJoinedRoutes(Long userId) {
        return repository.getJoinedRoutes(userId).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public Optional<RouteDTO> createRoute(RouteDTO routeDTO) {
        Route route = mapper.toEntity(routeDTO);

        try {
            route = repository.save(route);
        } catch (Exception e) {
            log.info("Error creating Route: " + e);
        }
        return Optional.of(mapper.toDto(route));
    }
}
