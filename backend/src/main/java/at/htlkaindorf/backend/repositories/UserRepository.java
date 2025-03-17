package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<String, User> {

     boolean existsByEmail(String email);


}
