package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteDetailDTO {

    private Long routeId;
    private AddressDetailDTO startAddress;
    private AddressDetailDTO endAddress;
    private LocalDateTime startTime;
    private UserAccountDTO driver;
    private String joinCode;
    private List<RouteMemberDTO> members;
}
