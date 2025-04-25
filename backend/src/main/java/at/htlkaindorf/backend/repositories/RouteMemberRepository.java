package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.RouteMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteMemberRepository extends JpaRepository<RouteMember, Long> {
}
