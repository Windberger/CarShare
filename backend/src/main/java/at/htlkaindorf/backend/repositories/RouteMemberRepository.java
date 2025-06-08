package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.RouteMember;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RouteMemberRepository extends JpaRepository<RouteMember, Long> {


    @Query("SELECT m FROM RouteMember m WHERE m.routeMemberPK.routeId = :routeId")
    public List<RouteMember> getMembersOfRoute(long routeId);

    @Modifying
    @Transactional
    @Query("DELETE FROM RouteMember WHERE route.routeId = :routeId AND member.userId = :memberId")
    void deleteByRouteIdAndMemberId(Long routeId, Long memberId);
}
