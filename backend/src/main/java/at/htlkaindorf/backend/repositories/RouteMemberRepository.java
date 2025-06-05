package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.RouteMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RouteMemberRepository extends JpaRepository<RouteMember, Long> {


    @Query("SELECT m FROM RouteMember m WHERE m.routeMemberPK.routeId = :routeId")
    public List<RouteMember> getMembersOfRoute(long routeId);
}
