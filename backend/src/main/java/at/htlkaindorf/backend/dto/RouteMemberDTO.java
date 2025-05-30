package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteMemberDTO {

    private Long routeId;
    private Long memberId;
    private AddressDetailDTO startAddress;
    private AddressDetailDTO endAddress;
}
