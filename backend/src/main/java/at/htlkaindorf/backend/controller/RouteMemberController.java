package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.RouteMemberDTO;
import at.htlkaindorf.backend.mapper.RouteMapper;
import at.htlkaindorf.backend.mapper.UserAccountMapper;
import at.htlkaindorf.backend.pojos.Address;
import at.htlkaindorf.backend.pojos.Route;
import at.htlkaindorf.backend.pojos.UserAccount;
import at.htlkaindorf.backend.service.RouteMemberService;
import at.htlkaindorf.backend.service.RouteService;
import at.htlkaindorf.backend.service.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @author Johanna Hechtl
 * @since 12.05.2025
 */


@RestController
@RequestMapping("/routemembers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RouteMemberController {

    private final RouteService routeService;
    private final RouteMemberService routeMemberService;
    private final RouteMapper routeMapper;
    private final UserAccountMapper userAccountMapper;
    private final UserAccountService userAccountService;



    // TODO: nochmal überprüfen wegen Adresse
    @PostMapping("/addRouteMember")
    public ResponseEntity<?> addRouteMember(@RequestParam String joinCode,
                                            @RequestParam Long userId,
                                            @RequestParam Address startAddress,
                                            @RequestParam Address endAddress
    ) {
        Route route = routeMapper.toEntity(routeService.getRouteByJoinCode(joinCode));
        UserAccount userAccount = userAccountMapper.toEntity(userAccountService.getUserById(userId));

        RouteMemberDTO routeMemberDTO = routeMemberService.addRouteMember(route, userAccount, startAddress, endAddress);
        return ResponseEntity.ok(routeMemberDTO);
    }
}