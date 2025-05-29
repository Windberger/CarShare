package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.CreateAddressDTO;
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

    private final RouteMemberService routeMemberService;

    @PostMapping("/addRouteMember")
    public ResponseEntity<?> addRouteMember(
            @RequestParam String joinCode,
            @RequestParam Long userId,
            @RequestParam CreateAddressDTO startAddress,
            @RequestParam CreateAddressDTO endAddress
    ) {
        RouteMemberDTO routeMemberDTO = routeMemberService.addRouteMember(joinCode, userId, startAddress, endAddress);
        return ResponseEntity.ok(routeMemberDTO);
    }
}