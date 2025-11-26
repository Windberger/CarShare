package at.htlkaindorf.backend.service.external;

import at.htlkaindorf.backend.dto.route.CoordinateAddress;
import at.htlkaindorf.backend.dto.route.OptimizationRequest;
import at.htlkaindorf.backend.dto.route.RouteResultDTO;
import at.htlkaindorf.backend.exception.RouteException;
import at.htlkaindorf.backend.pojos.Address;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenRouteService {

    @Value("${openrouteservice.api.key}")
    private String apiKey;
    private final RestTemplate restTemplate;

    public CoordinateAddress getCoordinateAddress(Address address) {
//        log.info("GetCoordinateAddress");
//        String query = String.join(" ", address.getStreet() + " " + address.getHouseNumber(),
//                address.getPostalCode() + " " + address.getCity());
//
//        String uri = UriComponentsBuilder
//                .fromUriString("https://api.openrouteservice.org/geocode/search")
//                .queryParam("api_key", apiKey)
//                .queryParam("text", query)
//                .queryParam("size", 1)
//                .build()
//                .toUriString();
//        log.info(uri);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Accept-Language", "de-DE");
//
//        HttpEntity<Void> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<JsonNode> response = restTemplate.exchange(uri, HttpMethod.GET, entity, JsonNode.class);
//
//        if (response.getBody() == null || response.getStatusCode() != HttpStatus.OK) {
//            throw new RouteException("Error while requesting coordinates: " + response.getHeaders());
//        }
//        JsonNode coords = response.getBody()
//                .path("features")
//                .get(0)
//                .path("geometry")
//                .path("coordinates");
//        log.info(response.getBody().toString())
//        ;
//
//        CoordinateAddress coordinateAddress = new CoordinateAddress(
//                address.getAddressId(),
//                address.getCountry(),
//                address.getPostalCode(),
//                address.getCity(),
//                address.getStreet(),
//                address.getHouseNumber(),
//                coords.get(0).asDouble(),
//                coords.get(1).asDouble()
//        );

//        return coordinateAddress;
        return null;
    }


    public RouteResultDTO optimizeAddresses(List<CoordinateAddress> addresses) {
        // Create objects for the Json Data
        OptimizationRequest.OptimizationVehicle vehicle = new OptimizationRequest.OptimizationVehicle(
                1,
                new double[]{addresses.get(0).getLat(), addresses.get(0).getLon()},
                new double[]{addresses.get(addresses.size() - 1).getLat(), addresses.get(addresses.size() - 1).getLon()},
                "driving-car"
        );

        List<OptimizationRequest.OptimizationJob> jobs = new ArrayList<>();
        for (int i = 1; i < addresses.size() - 1; i++) {
            jobs.add(new OptimizationRequest.OptimizationJob(
                    i,
                    new double[]{addresses.get(i).getLat(), addresses.get(i).getLon()}
            ));
        }

        OptimizationRequest request = new OptimizationRequest(jobs, List.of(vehicle), new OptimizationRequest.Options(true));


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", apiKey);

        HttpEntity<OptimizationRequest> entity = new HttpEntity<>(request, headers);
        String url = "https://api.openrouteservice.org/optimization";

        ResponseEntity<JsonNode> response = restTemplate.postForEntity(url, entity, JsonNode.class);

        if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
            throw new RouteException("Error while creating Route");
        }

        JsonNode routes = response.getBody().path("routes");
        if (routes.isArray() && !routes.isEmpty()) {
            JsonNode route = routes.get(0);

            List<double[]> coords = new ArrayList<>();
            for (JsonNode step : route.path("steps")) {
                JsonNode loc = step.path("location");
                double lon = loc.get(0).asDouble();
                double lat = loc.get(1).asDouble();
                coords.add(new double[]{lon, lat});
            }
            List<CoordinateAddress> orderedAddresses = new ArrayList<>();
            for (double[] coordinate : coords) {
                for (CoordinateAddress address : addresses) {
                    if (address.getLat().equals(coordinate[0]) && address.getLon().equals(coordinate[1])) {
                        orderedAddresses.add(address);
                    }
                }
            }

//            return new RouteResultDTO(
//                    addresses,
//                    null,
//                    null,
//                    null,
//                    null
//            );
        }
        return null;
    }

    public List<double[]> getDirectionsGeoJson(List<double[]> coordinates) {

        String url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", apiKey);

        // Create the request body
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode body = objectMapper.createObjectNode();
        ArrayNode coordsArray = objectMapper.createArrayNode();
        for (double[] coord : coordinates) {
            ArrayNode pair = objectMapper.createArrayNode();
            pair.add(coord[0]); // longitude
            pair.add(coord[1]); // latitude
            coordsArray.add(pair);
        }
        body.set("coordinates", coordsArray);

        HttpEntity<String> entity;
        try {
            entity = new HttpEntity<>(objectMapper.writeValueAsString(body), headers);
        } catch (JsonProcessingException e) {
            throw new RouteException("Failed to serialize coordinates: " + e);
        }

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, JsonNode.class);

        if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
            throw new RouteException("Error while requesting directions: " + response.getStatusCode());
        }

        List<double[]> coords = new ArrayList<>();
        JsonNode coordsNode = response.getBody().get("features").get(0).get("geometry").get("coordinates");

        for (JsonNode coord : coordsNode) {
            double lon = coord.get(0).asDouble();
            double lat = coord.get(1).asDouble();
            coords.add(new double[]{lat, lon});
        }

        return coords;
    }

    public RouteResultDTO getDurationAndDistance(RouteResultDTO routeResultDTO, List<double[]> coordinates) {

        String uri = "https://api.openrouteservice.org/v2/directions/driving-car";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("coordinates", coordinates);

        ObjectMapper mapper = new ObjectMapper();

        HttpEntity<String> request = null;
        try {
            request = new HttpEntity<>(mapper.writeValueAsString(requestMap), headers);
        } catch (JsonProcessingException e) {
            throw new RouteException("Failed to serialize coordinates: " + e);
        }

        ResponseEntity<JsonNode> response = restTemplate.postForEntity(uri, request, JsonNode.class);

        if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
            throw new RouteException("Error while requesting directions: " + response.getStatusCode());
        }

        JsonNode summary = response.getBody()
                .path("routes")
                .get(0)
                .path("summary");

        Long distance = summary.path("distance").asLong();
        Long duration = summary.path("duration").asLong();

        log.info("Distance: {} meters, Duration: {} seconds", distance, duration);
        routeResultDTO.setDistance(distance);
        routeResultDTO.setDuration(duration);

        return routeResultDTO;
    }
}

