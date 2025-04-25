package at.htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountDetailDTO {

    private Long userId;
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    private List<RouteDTO> routes;
}
