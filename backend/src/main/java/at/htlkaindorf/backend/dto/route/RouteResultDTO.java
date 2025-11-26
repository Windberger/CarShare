package at.htlkaindorf.backend.dto.route;

import at.htlkaindorf.backend.pojos.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteResultDTO {

    private List<Address> addresses;
    private String routePolyline;
    private Long driverId;
    private Long duration;
    private Long distance;
    private String northEastBound;
    private String southWestBound;

}
