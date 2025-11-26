package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.dto.CreateAddressDTO;
import at.htlkaindorf.backend.dto.RouteMemberDTO;
import at.htlkaindorf.backend.dto.RouteMemberDetailDTO;
import at.htlkaindorf.backend.exception.RouteException;
import at.htlkaindorf.backend.mapper.*;
import at.htlkaindorf.backend.pojos.*;
import at.htlkaindorf.backend.repositories.AddressRepository;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


/**
 * @author Johanna Hechtl
 * @since 12.05.2025
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class RouteMemberService {

    private final RouteMemberRepository routeMemberRepository;
    private final RouteMapper routeMapper;
    private final RouteService routeService;
    private final UserAccountMapper userAccountMapper;
    private final UserAccountService userAccountService;
    private final AddressService addressService;
    private final AddressRepository addressRepository;
    private final RouteMemberDetailMapper routeMemberDetailMapper;

    public void addRouteMember(String joinCode, Long userId, CreateAddressDTO startAddressDTO, CreateAddressDTO endAddressDTO) {
        Route route = routeMapper.toEntity(routeService.getRouteByJoinCode(joinCode));

        if (route.getDriver().getUserId().equals(userId)) {
            throw new RouteException("You cannot join a route you created!");
        }

        UserAccount userAccount = userAccountMapper.toEntity(userAccountService.getUserById(userId));
        RouteMemberPK routeMemberPK = new RouteMemberPK(route.getRouteId(), userAccount.getUserId());

        Long startAddressId = addressRepository.save(new Address(null, startAddressDTO.getPlaceId(), startAddressDTO.getDescription())).getAddressId();
        Long endAddressId = addressRepository.save(new Address(null, endAddressDTO.getPlaceId(), endAddressDTO.getDescription())).getAddressId();
        Optional<Address> startAddress = addressRepository.findById(startAddressId);
        Optional<Address> endAddress = addressRepository.findById(endAddressId);

        if (startAddress.isPresent() && endAddress.isPresent()) {
            routeMemberRepository.save(new RouteMember(routeMemberPK, route, userAccount, startAddress.get(), endAddress.get()));
            return;
        }

        throw new RouteException("An error occurred while joining the Route");
    }

    public Iterable<RouteMemberDetailDTO> getMembersOfRoute(Long routeId) {

        List<RouteMemberDetailDTO> routeMembers = routeMemberRepository.getMembersOfRoute(routeId).stream().map(routeMemberDetailMapper::toDto).toList();

        return routeMembers;


    }

    public RouteMemberDetailDTO removeMemberOfRoute(Long routeId, Long memberId) {
        Iterable<RouteMemberDetailDTO> routeMembers = getMembersOfRoute(routeId);

        for (RouteMemberDetailDTO routeMember : routeMembers) {

            if (routeMember.getMemberId().equals(memberId)) {
                log.info("Removing route member with ID: {}", memberId);
                routeMemberRepository.deleteByRouteIdAndMemberId(routeId, memberId);
                return routeMember;
            }

        }

        throw new RouteException("Route member not found!");
    }
}
