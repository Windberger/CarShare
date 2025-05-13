package at.htlkaindorf.backend.service;

import at.htlkaindorf.backend.dto.RouteMemberDTO;
import at.htlkaindorf.backend.mapper.RouteMemberMapper;
import at.htlkaindorf.backend.pojos.*;
import at.htlkaindorf.backend.repositories.RouteMemberRepository;
import at.htlkaindorf.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


/**
 * @author Johanna Hechtl
 * @since 12.05.2025
 */

@Service
@RequiredArgsConstructor
public class RouteMemberService {

    private final RouteMemberRepository routeMemberRepository;
    private final RouteMemberMapper mapper;
    private final RouteMemberMapper routeMemberMapper;


    public RouteMemberDTO addRouteMember(Route route, UserAccount userAccount, Address startAddress, Address endAddress) {
        RouteMemberPK routeMemberPK = new RouteMemberPK(route.getRouteId(), userAccount.getUserId());
        RouteMember routeMember = routeMemberRepository.save(new RouteMember(routeMemberPK, route, userAccount, startAddress, endAddress));

        return routeMemberMapper.toDto(routeMember);
    }
}
