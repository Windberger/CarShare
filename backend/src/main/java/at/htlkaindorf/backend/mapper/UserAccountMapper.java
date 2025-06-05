package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.UserAccountDTO;
import at.htlkaindorf.backend.dto.UserAccountDetailDTO;
import at.htlkaindorf.backend.pojos.UserAccount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {
    UserAccountDTO toDto(UserAccount user);
    UserAccount toEntity(UserAccountDTO dto);
}
