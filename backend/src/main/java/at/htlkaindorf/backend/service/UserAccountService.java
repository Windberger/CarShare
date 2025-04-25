package at.htlkaindorf.backend.services;

import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Optional<UserAccount> registerUser(UserAccount user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return Optional.empty();
        }

        UserAccount newUser = new UserAccount();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
        return Optional.of(newUser);  // TODO: dto von user statt user zurückgeben
    }


}
