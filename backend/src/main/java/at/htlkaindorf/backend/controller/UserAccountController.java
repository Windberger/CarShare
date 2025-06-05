package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.UserAccountDTO;
import at.htlkaindorf.backend.service.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Johanna Hechtl
 * @since 10.03.2025
 */


@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserAccountController {

    private final UserAccountService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserAccountDTO> getUserById(
            @PathVariable long id
    ){

        UserAccountDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);

    }


}
