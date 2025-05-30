package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.AddRouteMemberDTO;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @author Johanna Hechtl
 * @since 12.05.2025
 */


@RestController
@RequestMapping("/routeMembers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RouteMemberController {

    private final RouteMemberService routeMemberService;

    @PostMapping("/addRouteMember")
    public ResponseEntity<?> addRouteMember(
            @RequestBody AddRouteMemberDTO dto
    ) {
        routeMemberService.addRouteMember(
                dto.getJoinCode(),
                dto.getUserId(),
                dto.getStartAddress(),
                dto.getEndAddress()
        );
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}