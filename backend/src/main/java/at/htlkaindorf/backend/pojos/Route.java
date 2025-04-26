package at.htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @OneToOne
    @JoinColumn(name = "start_address")
    private Address startAddress;

    @OneToOne
    @JoinColumn(name = "end_address")
    private Address endAddress;

    private LocalDateTime startTime;

    @ManyToOne
    @JoinColumn(name = "driver")
    private UserAccount driver;

    private String joinCode;

    @OneToMany(mappedBy = "route")
    private List<RouteMember> routeMembers;

}
