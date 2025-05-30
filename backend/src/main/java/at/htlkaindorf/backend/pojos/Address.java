package at.htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "address",
        uniqueConstraints = @UniqueConstraint(
                name = "uc_address_unique_combination",
                columnNames = {"country", "postal_code", "city", "street", "house_number"}
        )
)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String country;

    private String postalCode;

    private String city;

    private String street;

    private String houseNumber;
}
