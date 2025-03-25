package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.RouteMemberDTO;
import at.htlkaindorf.backend.pojos.RouteMember;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RouteMemberMapper {

        RouteMemberDTO toDTO(RouteMember routeMember);

        RouteMember toEntity(RouteMemberDTO routeMemberDTO);
}
