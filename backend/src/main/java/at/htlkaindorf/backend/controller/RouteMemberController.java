package at.htlkaindorf.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
* @author Mario Windberger
* @since 03.05.2025
*/

@RestController
@RequestMapping("/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RouteMemberController {


    @PostMapping("/joinRoute")
    public ResponseEntity<?> joinRoute(
            @RequestParam String joinCode
    ) {
        return null;
    }
}
