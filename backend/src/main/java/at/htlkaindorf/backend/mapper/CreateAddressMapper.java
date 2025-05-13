package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.dto.CreateAddressDTO;
import at.htlkaindorf.backend.pojos.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CreateAddressMapper {

    CreateAddressDTO toDto(Address address);
    Address toEntity(CreateAddressDTO dto);

}
