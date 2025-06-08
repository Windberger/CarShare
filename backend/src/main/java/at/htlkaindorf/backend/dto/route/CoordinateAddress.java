package at.htlkaindorf.backend.dto.route;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoordinateAddress {
    private Long addressId;
    private String country;
    private String postalCode;
    private String city;
    private String street;
    private String houseNumber;
    private Double lat;
    private Double lon;

}
