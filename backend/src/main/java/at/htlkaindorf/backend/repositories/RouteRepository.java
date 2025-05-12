package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {


    @Query("SELECT r FROM Route r WHERE r.driver.userId = ?1")
    public List<Route> getDriverRoutes(Long userId);

    @Query("SELECT r FROM Route r INNER JOIN r.routeMembers m WHERE m.member.userId = :userId")
    public List<Route> getJoinedRoutes(Long userId);

    public boolean existsByJoinCode(String joinCode);

    public Route findByJoinCode(String joinCode);
}
