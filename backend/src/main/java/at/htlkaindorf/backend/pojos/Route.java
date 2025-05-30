package at.htlkaindorf.backend.pojos;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(
        name = "route",
        uniqueConstraints = @UniqueConstraint(
                name = "uc_route_unique_combination",
                columnNames = {"driver", "start_address", "end_address", "start_time"}
        )
)
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @ManyToOne
    @JoinColumn(name = "start_address")
    private Address startAddress;

    @ManyToOne
    @JoinColumn(name = "end_address")
    private Address endAddress;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;

    @ManyToOne
    @JoinColumn(name = "driver")
    private UserAccount driver;

    private String joinCode;

    @OneToMany(mappedBy = "route")
    private List<RouteMember> routeMembers;

}
