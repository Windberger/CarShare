package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.RouteMemberDetailDTO;
import at.htlkaindorf.backend.pojos.RouteMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {RouteMapper.class, UserAccountMapper.class, AddressMapper.class})
public interface RouteMemberDetailMapper {
    @Mapping(source = "route.routeId", target = "routeId")
    @Mapping(source = "member.userId", target = "memberId")
    RouteMemberDetailDTO toDto(RouteMember member);

    RouteMember toEntity(RouteMemberDetailDTO routeMember);
}
