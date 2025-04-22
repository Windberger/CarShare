package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Johanna Hechtl
 * @since 10.03.2025
 */


@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
//    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserAccount user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return null;

    }


}
