package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.CreateRouteDTO;
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

    @GetMapping("/joinCode")
    public ResponseEntity<RouteDTO> getRouteByJoinCode(
            @RequestParam String joinCode
    ) {
        return ResponseEntity.ok(routeService.getRouteByJoinCode(joinCode));
    }

    @PostMapping("/createRoute")
    public ResponseEntity<Long> createRoute(
            @RequestBody CreateRouteDTO routeDTO
    ) {
        return ResponseEntity.ok(routeService.createRoute(routeDTO));
    }


}
