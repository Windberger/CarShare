package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.RouteDTO;
import at.htlkaindorf.backend.dto.RouteDetailDTO;
import at.htlkaindorf.backend.pojos.Route;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface RouteMapper {
    RouteDTO toDto(Route route);
    Route toEntity(RouteDTO dto);
}
