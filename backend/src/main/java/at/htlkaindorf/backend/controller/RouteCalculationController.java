package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.route.RouteResultDTO;
import at.htlkaindorf.backend.service.RouteCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculate")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RouteCalculationController {

    private final RouteCalculationService routeCalculationService;

    @GetMapping("/{routeId}")
    public ResponseEntity<RouteResultDTO> calculateRoute(
            @PathVariable Long routeId
    ) {
        RouteResultDTO resultDTO = routeCalculationService.calculateRoute(routeId);
        return ResponseEntity.ok(resultDTO);
    }

}
