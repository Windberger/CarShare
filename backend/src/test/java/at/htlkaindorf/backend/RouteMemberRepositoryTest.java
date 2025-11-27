package at.htlkaindorf.backend;

import at.htlkaindorf.backend.pojos.RouteMember;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RouteMemberRepositoryTest {


    @Autowired
    private RouteMemberRepository routeMemberRepository;

    @Test
    void testCountMatchesDataSql() {
        long count = routeMemberRepository.count();
        assertEquals(7, count, "Anzahl der RouteMember stimmt nicht mit data.sql überein");
    }

    @Test
    void testFindAllNotEmpty() {
        Iterable<RouteMember> all = routeMemberRepository.findAll();
        assertNotNull(all);
        assertTrue(all.iterator().hasNext(), "findAll sollte mindestens einen RouteMember liefern");
    }

    @Test
    void testContainsMember1002() {
        List<RouteMember> list = StreamSupport.stream(routeMemberRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        boolean found = list.stream().anyMatch(rm -> Long.valueOf(1002L).equals(rm.getRouteMemberPK().getMemberId()));
        assertTrue(found, "Es sollte mindestens ein RouteMember mit memberId=1002 vorhanden sein");
    }

    @Test
    void testRoute10HasTwoMembers() {
        long countRoute10 = StreamSupport.stream(routeMemberRepository.findAll().spliterator(), false)
                .filter(rm -> Long.valueOf(10L).equals(rm.getRouteMemberPK().getRouteId()))
                .count();
        assertEquals(2, countRoute10, "Route mit routeId=10 sollte genau 2 Mitglieder haben");
    }

    @Test
    void testMember1001OnRoute8() {
        boolean exists = StreamSupport.stream(routeMemberRepository.findAll().spliterator(), false)
                .anyMatch(rm -> Long.valueOf(1001L).equals(rm.getRouteMemberPK().getMemberId()) && Long.valueOf(8L).equals(rm.getRouteMemberPK().getRouteId()));
        assertTrue(exists, "Member 1001 sollte auf Route 8 vorhanden sein");
    }

    @Test
    void testAllRouteMembersHaveAddresses() {
        List<RouteMember> list = StreamSupport.stream(routeMemberRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        for (RouteMember rm : list) {
            assertNotNull(rm.getStartAddress(), "startAddress darf nicht null sein (fehlender RouteMember)");
            assertNotNull(rm.getEndAddress(), "endAddress darf nicht null sein (fehlender RouteMember)");
        }
    }

    @Test
    void testRoute23HasTwoMembersUsingStream() {
        long countRoute23 = StreamSupport.stream(routeMemberRepository.findAll().spliterator(), false)
                .filter(rm -> Long.valueOf(23L).equals(rm.getRouteMemberPK().getRouteId()))
                .count();
        assertEquals(2, countRoute23, "Route mit routeId=23 sollte genau 2 Mitglieder haben");
    }
}
