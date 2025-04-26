package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.LoginRequestDTO;
import at.htlkaindorf.backend.dto.SignupRequestDTO;
import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.repositories.UserAccountRepository;
import at.htlkaindorf.backend.service.UserAccountService;
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
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * @author Mario Windberger
 * @since 25.04.2025
 */
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserAccountService userAccountService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest, HttpServletRequest request) {
       if(userAccountService.loginUser(loginRequest, request)) {
            return new ResponseEntity<>("User logged in successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password!", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequestDTO signupRequest, HttpServletRequest request) {

        if (userAccountService.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Email already used!", HttpStatus.BAD_REQUEST);
        }

        userAccountService.saveUser(signupRequest);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        userAccountService.logoutUser(request, response, authentication);

        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

    @GetMapping("/protected")
    public ResponseEntity<?> protectedEndpoint() {
        return new ResponseEntity<>("Protected endpoint", HttpStatus.OK);
    }
}

