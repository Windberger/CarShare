package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.UserAccountDTO;
import at.htlkaindorf.backend.pojos.UserAccount;
import org.mapstruct.Mapper;
import org.mapstruct.MapperConfig;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {

    UserAccountDTO toDTO(UserAccount userAccount);

    UserAccount toEntity(UserAccountDTO userAccountDTO);

}
