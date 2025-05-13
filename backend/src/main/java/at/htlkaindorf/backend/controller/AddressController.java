package at.htlkaindorf.backend.controller;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.dto.CreateAddressDTO;
import at.htlkaindorf.backend.mapper.CreateAddressMapper;
import at.htlkaindorf.backend.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<Long> addAddress(
            @RequestBody CreateAddressDTO addressDTO
    ) {
        Long addressId = addressService.addAddress(addressDTO);

        return ResponseEntity.ok(addressId);
    }
}
