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
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RouteCalculationService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    private final AddressRepository addressRepository;
    private final RouteRepository routeRepository;
    private final RouteMemberRepository routeMemberRepository;
    private final OpenRouteService openRouteService;
    private final RestTemplate restTemplate = new RestTemplate();

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

        String wpString = "optimize:true|";
        wpString += memberAddresses.stream()
                .map(address -> "place_id:" + address.getPlaceId())
                .collect(Collectors.joining("|"));

        URI baseUri = URI.create("https://maps.googleapis.com/maps/api/directions/json");
        URI uri = UriComponentsBuilder.fromUri(baseUri)
                .queryParam("origin", "place_id:" + route.getStartAddress().getPlaceId())
                .queryParam("destination", "place_id:" + route.getEndAddress().getPlaceId())
                .queryParam("waypoints", wpString)
                .queryParam("key", apiKey)
                .build()
                .toUri();

        ResponseEntity<JsonNode> resp = restTemplate.getForEntity(uri, JsonNode.class);
        log.info(uri.toString());

        JsonNode root = resp.getBody();

        List<String> orderedPlaceIds = new ArrayList<>();
        long totalDurationInSeconds = 0L;
        long totalDistanceInMeters = 0L;
        String northEastBound;
        String southWestBound;
        String overviewPolyline;

        if(root == null || !root.has("geocoded_waypoints")){
            throw new ResourceNotFoundException("Error retrieving route from Google Maps API");
        }

        for (JsonNode wp : root.get("geocoded_waypoints")) {
            orderedPlaceIds.add(wp.get("place_id").asText());
        }

        JsonNode legs = root.get("routes").get(0).get("legs");
        for (JsonNode leg : legs) {
            totalDurationInSeconds += leg.get("duration").get("value").asLong();
            totalDistanceInMeters += leg.get("distance").get("value").asLong();
        }

        JsonNode bounds = root.get("routes").get(0).get("bounds");
        northEastBound = bounds.get("northeast").get("lat").asText() + "," + bounds.get("northeast").get("lng").asText();
        southWestBound = bounds.get("southwest").get("lat").asText() + "," + bounds.get("southwest").get("lng").asText();


        overviewPolyline = root
                .get("routes")
                .get(0)
                .get("overview_polyline")
                .get("points")
                .asText();

        log.info("Ordered Place IDs: " + orderedPlaceIds);
        log.info("Total Duration (s): " + totalDurationInSeconds);
        log.info("Total Distance (m): " + totalDistanceInMeters);

        List<Address> allAddresses = new ArrayList<>();
        orderedPlaceIds.forEach(placeId -> addressRepository.findByPlaceId(placeId).ifPresent(allAddresses::add));

        return new RouteResultDTO(
                allAddresses,
                overviewPolyline,
                route.getDriver().getUserId(),
                totalDurationInSeconds,
                totalDistanceInMeters,
                northEastBound,
                southWestBound
        );
    }
}
