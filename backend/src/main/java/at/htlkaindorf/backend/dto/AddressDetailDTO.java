package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDetailDTO {

    private Long addressId;
    private String country;
    private String postalCode;
    private String city;
    private String street;
    private String houseNumber;

}
