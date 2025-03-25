package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

     boolean existsByEmail(String email);


}
