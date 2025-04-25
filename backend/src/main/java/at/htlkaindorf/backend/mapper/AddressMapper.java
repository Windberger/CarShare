package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.AddressDTO;
import at.htlkaindorf.backend.pojos.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {

        AddressDTO toDTO(Address address);

        Address toEntity(AddressDTO addressDTO);
}
