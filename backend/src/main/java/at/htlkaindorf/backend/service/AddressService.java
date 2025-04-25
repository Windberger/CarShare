package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.mapper.AddressMapper;
import at.htlkaindorf.backend.repositories.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository repository;
    private final AddressMapper mapper;

}
