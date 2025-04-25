package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.RouteDetailDTO;
import at.htlkaindorf.backend.pojos.Route;
import org.mapstruct.Mapper;

@Mapper(uses = {AddressMapper.class, UserAccountMapper.class, RouteMemberMapper.class})
public interface RouteDetailMapper {
    RouteDetailDTO toDto(Route route);
}
