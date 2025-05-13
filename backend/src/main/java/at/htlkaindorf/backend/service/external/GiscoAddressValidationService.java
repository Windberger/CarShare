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
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GiscoAddressValidationService {

    private final RestTemplate restTemplate;

    /**
     * This method checks with the Gisco Address API if the given address exists.
     * If the country is not in the EU, it will always return true.
     * @author Mario Windberger
     * @since 13.05.2025
     * @param dto
     * @return True, if the address exists;
     *         False, if the address does not exist
     */
    public boolean isValidAddress(CreateAddressDTO dto) {
        String[] countryCodes = Locale.getISOCountries();
        List<String> euCountryCodes = List.of(
                "BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT",
                "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE", "IS", "LI", "NO", "CH"
        );

        if (Arrays.stream(countryCodes).noneMatch(code -> code.equalsIgnoreCase(dto.getCountry().trim()))
            || !euCountryCodes.contains(dto.getCountry().trim().toUpperCase())) {
            return false;
        }

        URI baseUrl = URI.create("https://gisco-services.ec.europa.eu/addressapi/search");

        URI uri = UriComponentsBuilder.fromUri(baseUrl)
                .queryParam("postcode", dto.getPostalCode())
                .queryParam("road", dto.getStreet())
                .queryParam("housenumber", dto.getHouseNumber())
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUri();

        ResponseEntity<Map> response = restTemplate.getForEntity(uri, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

            if (results == null || results.isEmpty()) {
                return false;
            }

            for (Map<String, Object> result : results) {
                String apiCountry = result.get("L0").toString().trim().toLowerCase();
                String apiPostalCode = result.get("PC").toString().trim().toLowerCase();
                String apiStreet = result.get("TF").toString().trim().toLowerCase();
                String apiHouseNumber = result.get("LD").toString().trim().toLowerCase();

                if (!apiCountry.isEmpty() && dto.getCountry().toLowerCase().equalsIgnoreCase(apiCountry)
                    && !apiPostalCode.isEmpty() && dto.getPostalCode().toLowerCase().equalsIgnoreCase(apiPostalCode)
                    && !apiStreet.isEmpty() && dto.getStreet().toLowerCase().equalsIgnoreCase(apiStreet)
                    && !apiHouseNumber.isEmpty() && dto.getHouseNumber().toLowerCase().equalsIgnoreCase(apiHouseNumber)) {
                    return true;
                }
            }
        }

        return false;
    }
}
