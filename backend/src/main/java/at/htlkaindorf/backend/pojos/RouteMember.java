package at.htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RouteMember {

    @EmbeddedId
    private RouteMemberPK routeMemberPK;

    @ManyToOne
    @MapsId("routeId")
    @JoinColumn(name = "route_id")
    private Route route;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private UserAccount member;

    @ManyToOne
    @JoinColumn(name = "start_address")
    private Address startAddress;

    @ManyToOne
    @JoinColumn(name = "end_address")
    private Address endAddress;

}
