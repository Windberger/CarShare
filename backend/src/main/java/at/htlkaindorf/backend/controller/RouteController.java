package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.RouteDTO;
import at.htlkaindorf.backend.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

/**
 * @author Johanna Hechtl
 * @since 26.04.2025
 */

public class RouteController {

    private final RouteService routeService;


    @GetMapping("/driverRoutes")
    public ResponseEntity<Iterable<RouteDTO>> getAllDriverRoutes(
            @RequestParam Long userId
    ) {
        return ResponseEntity.ok(routeService.getAllDriverRoutes(userId));

    }

    @GetMapping("/joinedRoutes")
    public ResponseEntity<Iterable<RouteDTO>> getAllJoinedRoutes(
            @RequestParam Long userId
    ) {

        return ResponseEntity.ok(routeService.getAllJoinedRoutes(userId));
    }

    @PostMapping("/createRoute")
    public ResponseEntity<RouteDTO> createRoute(
            @RequestBody RouteDTO routeDTO
    ) {
        Optional<RouteDTO> createdRoute = routeService.createRoute(routeDTO);

        if(createdRoute.isPresent()) {
            return new ResponseEntity<>(routeDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
