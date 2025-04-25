package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
* @author Mario Windberger
* @since 25.04.2025
*/
@Service
@RequiredArgsConstructor
public class UserAccountService  implements UserDetailsService {

    private final UserAccountRepository userRepository;
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


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserAccount user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(email + " not found." ));

        Set<GrantedAuthority> authorities = Set.of(new SimpleGrantedAuthority("ROLE_USER"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
}
