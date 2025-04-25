package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
