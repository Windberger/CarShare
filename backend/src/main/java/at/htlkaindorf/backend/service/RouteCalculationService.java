package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.route.CoordinateAddress;
import at.htlkaindorf.backend.dto.route.RouteResultDTO;
import at.htlkaindorf.backend.exception.ResourceNotFoundException;
import at.htlkaindorf.backend.pojos.Address;
import at.htlkaindorf.backend.pojos.Route;
import at.htlkaindorf.backend.pojos.RouteMember;
import at.htlkaindorf.backend.repositories.AddressRepository;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import at.htlkaindorf.backend.service.external.OpenRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteCalculationService {

    private final AddressRepository addressRepository;
    private final RouteRepository routeRepository;
    private final RouteMemberRepository routeMemberRepository;
    private final OpenRouteService openRouteService;

    public RouteResultDTO calculateRoute(Long routeId) {
        Optional<Route> routeOptional = routeRepository.findById(routeId);
        if (routeOptional.isEmpty()) {
            throw new ResourceNotFoundException("Route not found");
        }
        Route route = routeOptional.get();

        List<RouteMember> routeMembers = routeMemberRepository.getMembersOfRoute(routeId);

        List<Address> memberAddresses = new ArrayList<>();
        memberAddresses.addAll(routeMembers.stream().map(RouteMember::getStartAddress).toList());
        memberAddresses.addAll(routeMembers.stream().map(RouteMember::getEndAddress).toList());

        memberAddresses = memberAddresses.stream().distinct().collect(Collectors.toList());
        //Remove addresses that are equal to the start or end address
        memberAddresses.removeIf(address -> address.getAddressId().equals(route.getStartAddress().getAddressId()));
        memberAddresses.removeIf(address -> address.getAddressId().equals(route.getEndAddress().getAddressId()));


        List<CoordinateAddress> addresses = new ArrayList<>();
        addresses.add(openRouteService.getCoordinateAddress(route.getStartAddress()));
        addresses.addAll(memberAddresses.stream()
                .map(openRouteService::getCoordinateAddress)
                .toList());
        addresses.add(openRouteService.getCoordinateAddress(route.getEndAddress()));

        RouteResultDTO resultDTO;
        if (addresses.size() > 2) {
            resultDTO = openRouteService.optimizeAddresses(addresses);
        } else {
            resultDTO = new RouteResultDTO(addresses, null, null, null, null
            );
        }

        List<double[]> coordinates = new ArrayList<>();
        for (CoordinateAddress coordinateAddress : resultDTO.getAddresses()) {
            coordinates.add(new double[]{coordinateAddress.getLat(), coordinateAddress.getLon()});
        }

        resultDTO.setDirectionCoordinates(openRouteService.getDirectionsGeoJson(coordinates));
        resultDTO.setDriverId(route.getDriver().getUserId());
        resultDTO = openRouteService.getDurationAndDistance(resultDTO, coordinates);


        return resultDTO;
    }
}
