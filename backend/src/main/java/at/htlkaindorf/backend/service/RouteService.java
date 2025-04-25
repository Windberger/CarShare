package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.mapper.RouteMapper;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository repository;
    private final RouteMapper mapper;


}
