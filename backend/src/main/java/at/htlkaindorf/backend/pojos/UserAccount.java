package at.htlkaindorf.backend.pojos;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    @OneToMany(mappedBy = "driver", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Route> routes;

}
