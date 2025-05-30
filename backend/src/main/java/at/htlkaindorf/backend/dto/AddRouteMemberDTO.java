package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddRouteMemberDTO {
    private String joinCode;
    private Long userId;
    private CreateAddressDTO startAddress;
    private CreateAddressDTO endAddress;
}
