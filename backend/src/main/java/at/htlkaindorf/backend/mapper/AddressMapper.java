package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.AddressDetailDTO;
import at.htlkaindorf.backend.pojos.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressDetailDTO toDto(Address address);
    Address toEntity(AddressDetailDTO dto);
}
