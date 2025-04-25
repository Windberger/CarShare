package at.htlkaindorf.backend.mapper;

import at.htlkaindorf.backend.dto.LoginRequestDTO;
import at.htlkaindorf.backend.pojos.UserAccount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginRequestMapper {
    LoginRequestDTO toDto(UserAccount dto);
}
