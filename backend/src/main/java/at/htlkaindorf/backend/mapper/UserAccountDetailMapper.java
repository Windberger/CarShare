package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.UserAccountDetailDTO;
import at.htlkaindorf.backend.pojos.UserAccount;
import org.mapstruct.Mapper;

@Mapper(uses = {RouteMapper.class})
public interface UserAccountDetailMapper {
    UserAccountDetailDTO toDto(UserAccount user);
}