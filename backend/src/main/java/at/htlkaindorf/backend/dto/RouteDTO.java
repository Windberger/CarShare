package at.htlkaindorf.backend.dto;

import at.htlkaindorf.backend.pojos.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RouteDTO {

    private Long routeId;
    private Address startAddress;
    private Address endAddress;
    private LocalDateTime startTime;
    private UserAccountDTO driver;
    private String joinCode;
}
