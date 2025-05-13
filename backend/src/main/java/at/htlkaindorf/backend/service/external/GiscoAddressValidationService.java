package at.htlkaindorf.backend.service.external;

import at.htlkaindorf.backend.dto.CreateAddressDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GiscoAddressValidationService {

    private final RestTemplate restTemplate;

    public boolean isValidAddress(CreateAddressDTO dto) {
        URI baseUrl = URI.create("https://gisco-services.ec.europa.eu/addressapi/search");

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUri(baseUrl)
                .queryParam("postcode", dto.getPostalCode())
                .queryParam("road", dto.getStreet())
                .queryParam("housenumber", dto.getHouseNumber());

        log.info(uriBuilder.toUriString());
        ResponseEntity<Map> response = restTemplate.getForEntity(uriBuilder.toUriString(), Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            List<?> results = (List<?>) response.getBody().get("results");
            log.info(results.toString());
            return results != null && !results.isEmpty();
        }


        return false;
    }
}
