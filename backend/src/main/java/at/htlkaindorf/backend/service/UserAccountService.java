package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserAccountService {

    private final UserAccountRepository userRepository;


    public Optional<UserAccount> registerUser(UserAccount user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return Optional.empty();
        }

        UserAccount savedUser = userRepository.save(user);

        return Optional.of(savedUser);
    }


}
