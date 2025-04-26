package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.RouteDTO;
import at.htlkaindorf.backend.mapper.RouteMapper;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository repository;
    private final RouteMapper mapper;


    public Iterable<RouteDTO> getAllDriverRoutes(Long userId) {

        return repository.getDriverRoutes(userId).stream().map(mapper::toDto).collect(Collectors.toList());


    }

    public Iterable<RouteDTO> getAllJoinedRoutes(Long userId) {
        return repository.getJoinedRoutes(userId).stream().map(mapper::toDto).collect(Collectors.toList());
    }
}
