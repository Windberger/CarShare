package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.mapper.RouteMemberMapper;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RouteMemberService {

    private final RouteMemberRepository routeMemberRepository;
    private final RouteRepository routeRepository;
    private final RouteMemberMapper mapper;

    public boolean joinRoute(String joinCode) {
        return true;
    }

}
