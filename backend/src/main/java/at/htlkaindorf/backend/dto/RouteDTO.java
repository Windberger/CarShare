package at.htlkaindorf.backend.dto;

import at.htlkaindorf.backend.pojos.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteDTO {

    private Long routeId;
    private AddressDetailDTO startAddress;
    private AddressDetailDTO endAddress;
    private LocalDateTime startTime;
    private UserAccountDTO driver;
    private String joinCode;
}
