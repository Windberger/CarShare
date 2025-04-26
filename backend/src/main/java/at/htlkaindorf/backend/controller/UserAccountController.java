package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.service.UserAccountService;
import lombok.RequiredArgsConstructor;
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

//    @PostMapping("/register")
//    public ResponseEntity<Object> registerUser(@RequestBody UserAccount user) {
////        if(userRepository.existsByEmail(signupRequest.getEmail())){
////            return new ResponseEntity<>("Email already used!", HttpStatus.BAD_REQUEST);
////        }
//        return ResponseEntity.ok(userService.registerUser(user));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login() {
//        return null;
//
//    }


}
