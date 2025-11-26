package at.htlkaindorf.backend;

import at.htlkaindorf.backend.pojos.Route;
import at.htlkaindorf.backend.repositories.RouteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class RouteRepositoryTest {
    @Autowired
    private RouteRepository routeRepository;


    @Test
    void testRouteCountIsLoaded() {
        long count = routeRepository.count();
        assertEquals(8, count, "Anzahl der Routen stimmt nicht mit data.sql überein");
    }

    @Test
    void testFindByIdExists() {
        Optional<?> route = routeRepository.findById(1L);
        assertTrue(route.isPresent(), "Route mit id=1 sollte vorhanden sein");
    }

    @Test
    void testFindAllNotEmpty() {
        Iterable<?> all = routeRepository.findAll();
        assertNotNull(all);
        assertTrue(all.iterator().hasNext(), "findAll sollte mindestens einen Eintrag liefern");
    }

    @Test
    void testRoute1Fields() {
        Route route = routeRepository.findById(1L).orElseThrow();
        assertEquals("WQUD1CHG", route.getJoinCode(), "JoinCode von Route id=1 stimmt nicht");
        assertNotNull(route.getStartAddress(), "startAddress darf nicht null sein");
        assertEquals(1L, route.getStartAddress().getAddressId().longValue(), "startAddress.id sollte 1 sein");
        assertNotNull(route.getEndAddress(), "endAddress darf nicht null sein");
        assertEquals(1L, route.getEndAddress().getAddressId().longValue(), "endAddress.id sollte 1 sein");
    }

    @Test
    void testAllRoutesHaveJoinCodeAndStartTime() {
        Iterable<Route> all = routeRepository.findAll();
        for (Route r : all) {
            assertNotNull(r.getJoinCode(), "Jede Route muss einen joinCode haben");
            assertNotNull(r.getStartTime(), "Jede Route muss ein startTime haben");
        }
    }

    @Test
    void testJoinCodesUnique() {
        List<String> codes = new ArrayList<>();
        routeRepository.findAll().forEach(r -> codes.add(r.getJoinCode()));
        assertEquals(codes.size(), new HashSet<>(codes).size(), "Join-Codes müssen eindeutig sein");
    }

    @Test
    void testFindByJoinCodeUsingStream() {
        Optional<Route> found = routeRepository.findAll()
                .stream()
                .filter(r -> "WQUD1CHG".equals(r.getJoinCode()))
                .findFirst();
        assertTrue(found.isPresent(), "Route mit JoinCode WQUD1CHG sollte vorhanden sein");
        assertEquals(1L, found.get().getRouteId().longValue(), "Gefundene Route sollte id=1 haben");
    }

    @Test
    void testAllRoutesHaveDriver() {
        Iterable<Route> all = routeRepository.findAll();
        for (Route r : all) {
            assertNotNull(r.getDriver(), "Jede Route muss einen Driver haben (fehlende RouteId: " + r.getRouteId() + ")");
        }
    }
}
