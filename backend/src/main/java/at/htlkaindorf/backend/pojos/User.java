package at.htlkaindorf.backend.pojos;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    private String user_id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;


}
