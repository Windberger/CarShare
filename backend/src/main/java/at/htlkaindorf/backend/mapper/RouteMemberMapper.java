package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.RouteMemberDTO;
import at.htlkaindorf.backend.dto.RouteMemberDetailDTO;
import at.htlkaindorf.backend.pojos.RouteMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface RouteMemberMapper {
    RouteMemberDTO toDto(RouteMember member);
    RouteMember toEntity(RouteMemberDTO dto);
}
