package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.pojos.Route;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RouteMapper {

    RouteMapper toDTO(Route route);

    Route toEntity(RouteMapper routeDTO);

}
