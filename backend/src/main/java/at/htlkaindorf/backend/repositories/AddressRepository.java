package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a FROM Address a WHERE a.country = :country AND a.postalCode = :postalCode AND a.city = :city AND a.street = :street AND a.houseNumber = :houseNumber")
    Optional<Address> findByDetails(String country, String postalCode, String city, String street, String houseNumber);

}
