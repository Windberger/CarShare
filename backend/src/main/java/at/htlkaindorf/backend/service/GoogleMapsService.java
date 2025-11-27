package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.PlaceDTO;
import at.htlkaindorf.backend.exception.InvalidAddressException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleMapsService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper;

    public List<PlaceDTO> autocomplete (String input, String language) {
        String sanitized = input == null ? "" : input.trim().replaceAll("\\s+", " ");
        if (sanitized.isEmpty()) {
            return new ArrayList<>();
        }
        URI baseUri = URI.create("https://maps.googleapis.com/maps/api/place/autocomplete/json");
        URI uri = UriComponentsBuilder.fromUri(baseUri)
                .queryParam("input", sanitized)
                .queryParam("key", apiKey)
                .queryParam("language", language)
                .queryParam("components", "country:at")
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUri();
        ResponseEntity<String> resp = restTemplate.getForEntity(uri, String.class);
        log.info("Autocomplete request URL: " + uri);
        try {
            return parsePlacesFromResponse(resp.getBody());
        } catch (JsonProcessingException e) {
            throw new InvalidAddressException("Error parsing Google Maps response");
        }
    }

    public PlaceDTO geocode(String lat, String lng, String language) {
        String url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng
                + "&key=" + apiKey + "&language=" + language;
        ResponseEntity<String> resp = restTemplate.getForEntity(url, String.class);
        log.info("Geocode request URL: " + url);

        try {
            return parseGeocodeToPlaceDTO(resp.getBody());
        } catch (JsonProcessingException e) {
            throw new InvalidAddressException("Error parsing Google Maps response");
        }
    }

    private PlaceDTO parseGeocodeToPlaceDTO(String responseBody) throws JsonProcessingException {
        if (responseBody == null || responseBody.isEmpty()) {
            throw new InvalidAddressException("Empty response from Google Maps API");
        }

        PlaceDTO placeDTO = new PlaceDTO();

        JsonNode root = mapper.readTree(responseBody);
        JsonNode result = root.path("results").get(0);

        placeDTO.setDescription(result.path("formatted_address").asText(null));
        placeDTO.setPlaceId(result.path("place_id").asText(null));

        return placeDTO;
    }

    private List<PlaceDTO> parsePlacesFromResponse(String responseBody) throws JsonProcessingException {

        List<PlaceDTO> places = new ArrayList<>();

        if (responseBody == null || responseBody.isEmpty()) {
            return places;
        }

        JsonNode root = mapper.readTree(responseBody);
        JsonNode predictions = root.path("predictions");

        if (predictions.isArray()) {
            for (JsonNode p : predictions) {
                String placeId = p.path("place_id").asText(null);
                String description = p.path("description").asText(null);

                Map<String, Object> map = new HashMap<>();
                map.put("placeId", placeId);
                map.put("description", description);

                PlaceDTO dto = mapper.convertValue(map, PlaceDTO.class);
                places.add(dto);
            }
        }
        return places;
    }

}
