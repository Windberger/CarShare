package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.RouteMemberDetailDTO;
import at.htlkaindorf.backend.pojos.RouteMember;
import org.mapstruct.Mapper;

@Mapper(uses = {RouteMapper.class, UserAccountMapper.class, AddressMapper.class})
public interface RouteMemberDetailMapper {
    RouteMemberDetailDTO toDto(RouteMember member);
}
