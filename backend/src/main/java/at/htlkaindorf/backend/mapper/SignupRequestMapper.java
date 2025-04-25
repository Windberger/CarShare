package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.SignupRequestDTO;
import at.htlkaindorf.backend.pojos.UserAccount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SignupRequestMapper {
    SignupRequestDTO toDto(UserAccount dto);
    UserAccount toEntity(SignupRequestDTO dto);
}
