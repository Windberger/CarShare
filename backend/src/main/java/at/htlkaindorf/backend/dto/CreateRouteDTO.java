package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRouteDTO {
    private List<CreateAddressDTO> addresses;
    private LocalDateTime startTime;
    private Long driverId;
}
