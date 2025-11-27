package at.htlkaindorf.backend.dto;

import at.htlkaindorf.backend.pojos.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteMemberDetailDTO {

    private Long routeId;
    private Long memberId;
    private RouteDTO route;
    private UserAccountDTO member;
    private Address startAddress;
    private Address endAddress;

}
