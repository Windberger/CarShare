package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.dto.CreateAddressDTO;
import at.htlkaindorf.backend.dto.RouteMemberDTO;
import at.htlkaindorf.backend.exception.RouteException;
import at.htlkaindorf.backend.mapper.AddressMapper;
import at.htlkaindorf.backend.mapper.RouteMapper;
import at.htlkaindorf.backend.mapper.RouteMemberMapper;
import at.htlkaindorf.backend.mapper.UserAccountMapper;
import at.htlkaindorf.backend.pojos.*;
import at.htlkaindorf.backend.repositories.AddressRepository;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


/**
 * @author Johanna Hechtl
 * @since 12.05.2025
 */

@Service
@RequiredArgsConstructor
public class RouteMemberService {

    private final RouteMemberRepository routeMemberRepository;
    private final RouteMemberMapper routeMemberMapper;
    private final RouteMapper routeMapper;
    private final RouteService routeService;
    private final UserAccountMapper userAccountMapper;
    private final UserAccountService userAccountService;
    private final AddressService addressService;
    private final AddressRepository addressRepository;

    //TODO: Methode ist noch nicht ganz fertig
    public RouteMemberDTO addRouteMember(String joinCode, Long userId, CreateAddressDTO createStartAddress, CreateAddressDTO createEndAddress) {
        Route route = routeMapper.toEntity(routeService.getRouteByJoinCode(joinCode));
        UserAccount userAccount = userAccountMapper.toEntity(userAccountService.getUserById(userId));

        RouteMemberPK routeMemberPK = new RouteMemberPK(route.getRouteId(), userAccount.getUserId());

        Long startAddressId = addressService.addAddress(createStartAddress);
        Long endAddressId = addressService.addAddress(createEndAddress);
        Optional<Address> startAddress = addressRepository.findById(startAddressId);
        Optional<Address> endAddress = addressRepository.findById(endAddressId);

        if(startAddress.isPresent() && endAddress.isPresent()) {
            RouteMember routeMember = routeMemberRepository.save(new RouteMember(routeMemberPK, route, userAccount, startAddress.get(), endAddress.get()));
            return routeMemberMapper.toDto(routeMember);
        }

        throw new RouteException("An error occurred while joining the Route");
    }
}
