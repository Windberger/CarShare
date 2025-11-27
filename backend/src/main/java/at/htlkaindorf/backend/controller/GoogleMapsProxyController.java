package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.PlaceDTO;
import at.htlkaindorf.backend.service.GoogleMapsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
@Slf4j
@RequiredArgsConstructor
public class GoogleMapsProxyController {

    private final GoogleMapsService googleMapsService;

    @GetMapping("/autocomplete")
    public ResponseEntity<List<PlaceDTO>> autocomplete(
            @RequestParam String input,
            @RequestParam(required = false, defaultValue = "de") String language
    ) {

        List<PlaceDTO> places = googleMapsService.autocomplete(input, language);

        places.forEach(place -> log.info("Found place: " + place.getDescription()));
        return ResponseEntity.ok(places);
    }

    @GetMapping("/geocode")
    public ResponseEntity<PlaceDTO> geocode (
            @RequestParam String lat,
            @RequestParam String lng,
            @RequestParam(required = false, defaultValue = "de") String language

    ) {
        PlaceDTO place = googleMapsService.geocode(lat, lng, language);

        return ResponseEntity.ok(place);
    }
}
