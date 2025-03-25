package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteRepository extends JpaRepository<Route, Long> {
}
