package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

     Optional<UserAccount> findByEmail(String email);
     boolean existsByEmail(String email);

}
