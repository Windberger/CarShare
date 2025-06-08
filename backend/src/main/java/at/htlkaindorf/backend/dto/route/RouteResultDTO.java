package at.htlkaindorf.backend.dto.route;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteResultDTO {

    private List<CoordinateAddress> addresses;
    private List<double[]> directionCoordinates;
    private Long driverId;
    private Long duration;
    private Long distance;

}
