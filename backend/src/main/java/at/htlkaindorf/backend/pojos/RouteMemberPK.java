package at.htlkaindorf.backend.pojos;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class RouteMemberPK implements Serializable {

    private Long routeId;
    private Long memberId;

}
