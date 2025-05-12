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
    public ResponseEntity<Long> login(@RequestBody LoginRequestDTO loginRequest, HttpServletRequest request) {

        Long userId = userAccountService.loginUser(loginRequest, request);

        return ResponseEntity.ok(userId);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequestDTO signupRequest, HttpServletRequest request) {

        if (userAccountService.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already used");
        }

        Long userId = userAccountService.saveUser(signupRequest);

        return ResponseEntity.ok(userId);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        userAccountService.logoutUser(request, response, authentication);

        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }
}

