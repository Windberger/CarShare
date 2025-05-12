package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.LoginRequestDTO;
import at.htlkaindorf.backend.dto.SignupRequestDTO;
import at.htlkaindorf.backend.exception.LoginException;
import at.htlkaindorf.backend.exception.UserCreationException;
import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.UserAccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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
public class UserAccountService {

    private final UserAccountRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Long saveUser(SignupRequestDTO signupRequest) {
        try {
            UserAccount user = new UserAccount();
            user.setFirstname(signupRequest.getFirstname());
            user.setLastname(signupRequest.getLastname());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

            userRepository.save(user);

            return user.getUserId();
        } catch (Exception e) {
            throw new UserCreationException("Error creating user: " + e.getMessage());
        }
    }

    public Long loginUser(LoginRequestDTO loginRequest, HttpServletRequest request) {
        try {
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getEmail(), loginRequest.getPassword());
            Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);

            SecurityContextHolder.getContext().setAuthentication(authenticationResponse);

            HttpSession session = request.getSession();
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            Optional<UserAccount> user = userRepository.findByEmail(loginRequest.getEmail());


            if (user.isPresent()) {
                return user.get().getUserId();
            }
            throw new LoginException("User not found");
        } catch (Exception e) {
            throw new LoginException(e.getMessage());
        }
    }

    public void logoutUser(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try {
            logoutHandler.logout(request, response, authentication);

            request.getSession().removeAttribute("SPRING_SECURITY_CONTEXT");
            request.getSession().invalidate();
            SecurityContextHolder.clearContext();
        } catch (Exception e) {
            throw new LoginException("Error logging out: " + e.getMessage());
        }
    }

}
