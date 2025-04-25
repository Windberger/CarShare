package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.pojos.UserAccount;
<<<<<<<< HEAD:backend/src/main/java/at/htlkaindorf/backend/controller/UserController.java
import at.htlkaindorf.backend.services.UserService;
========
import at.htlkaindorf.backend.service.UserAccountService;
>>>>>>>> origin/master:backend/src/main/java/at/htlkaindorf/backend/controller/UserAccountController.java
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
public class UserAccountController {

    private final UserAccountService userService;
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
