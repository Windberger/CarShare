package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.LoginRequestDTO;
import at.htlkaindorf.backend.dto.SignupRequestDTO;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * @author Mario Windberger
 * @since 25.04.2025
 */
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final UserAccountRepository userRepository;

    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest, HttpServletRequest request) {

        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getEmail(), loginRequest.getPassword());
        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);

        SecurityContextHolder.getContext().setAuthentication(authenticationResponse);

        HttpSession session = request.getSession();
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequestDTO signupRequest, HttpServletRequest request) {

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Email already used!", HttpStatus.BAD_REQUEST);
        }

        UserAccount user = new UserAccount();
        user.setFirstname(signupRequest.getFirstname());
        user.setLastname(signupRequest.getLastname());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));


        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutHandler.logout(request, response, authentication);

        request.getSession().removeAttribute("SPRING_SECURITY_CONTEXT");
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);


    }
}

