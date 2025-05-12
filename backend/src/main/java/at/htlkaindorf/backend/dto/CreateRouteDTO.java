package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRouteDTO {
    private Long startAddressId;
    private Long endAddressId;
    private LocalDateTime startTime;
    private Long driverId;
}
