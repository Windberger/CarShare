package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.dto.CreateAddressDTO;
import at.htlkaindorf.backend.exception.InvalidAddressException;
import at.htlkaindorf.backend.mapper.AddressMapper;
import at.htlkaindorf.backend.mapper.CreateAddressMapper;
import at.htlkaindorf.backend.pojos.Address;
import at.htlkaindorf.backend.repositories.AddressRepository;
import at.htlkaindorf.backend.service.external.GiscoAddressValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final CreateAddressMapper createAddressMapper;
    private final GiscoAddressValidationService addressValidationService;

    public Long addAddress(CreateAddressDTO addressDTO) {

        addressDTO.setCity(
                addressDTO.getCity()
                        .replaceAll("ß", "ss")
                        .replaceAll("ä", "ae")
                        .replaceAll("Ä", "Ae")
                        .replaceAll("ö", "oe")
                        .replaceAll("Ö", "Oe")
                        .replaceAll("ü", "ue")
                        .replaceAll("Ü", "Ue")
        );

        addressDTO.setStreet(
                addressDTO.getStreet()
                        .replaceAll("ß", "ss")
                        .replaceAll("ä", "ae")
                        .replaceAll("Ä", "Ae")
                        .replaceAll("ö", "oe")
                        .replaceAll("Ö", "Oe")
                        .replaceAll("ü", "ue")
                        .replaceAll("Ü", "Ue")
        );

        if (!addressValidationService.isValidAddress(addressDTO)) {
            throw new InvalidAddressException("Invalid address");
        }

        Address address = createAddressMapper.toEntity(addressDTO);

        try {
            Optional<Address> existingAddress = addressRepository.findByDetails(
                    address.getCountry(),
                    address.getPostalCode(),
                    address.getCity(),
                    address.getStreet(),
                    address.getHouseNumber()
            );

            if (existingAddress.isPresent()) {
                return existingAddress.get().getAddressId();
            }

            Address savedAddress = addressRepository.save(address);
            return savedAddress.getAddressId();
        } catch (DataIntegrityViolationException e) {
            return addressRepository.findByDetails(
                    address.getCountry(),
                    address.getPostalCode(),
                    address.getCity(),
                    address.getStreet(),
                    address.getHouseNumber()
            ).orElseThrow(() -> new RuntimeException("Unexpected error")).getAddressId();
        }
    }
}