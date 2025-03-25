package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.mapper.RouteMemberMapper;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RouteMemberService {

    private final RouteMemberRepository repository;
    private final RouteMemberMapper mapper;

}
