import React, {useContext, useState, useEffect} from "react";
import Navbar from "../../components/Navbar.tsx";
import {useParams} from "react-router-dom";
import {RouteContext} from "../../context/RouteContext.tsx";
import {IRoute} from "../../model/IRoute.ts";
import {getRouteMembers} from "../../services/RouteMemberService.ts";
import {IMember} from "../../model/IMember.ts";
import {IUser} from "../../model/IUser.ts";
import {getUser} from "../../services/UserService.ts";


function RouteDetails() {
    const {id} = useParams();
    const {recentRoutes, joinedRoutes} = useContext(RouteContext)!;
    const routeId = Number(id);
    const [members, setMembers] = useState<IMember[]>([]);
    const [membersAccount, setMembersAccount] = useState<IUser[]>([]);
    const [currentMember, setCurrentMember] = useState<IMember>()

    const route =
        recentRoutes.find((r) => r.routeId === routeId) ||
        joinedRoutes.find((r) => r.routeId === routeId);


    const getCurrentMember = (memberId: number) => {
        if (!members) return;
        const user = members.find((m) => m.memberId === memberId);
        setCurrentMember(user);
    };


    console.log(recentRoutes)
    console.log(id)
    console.log(route)


    useEffect(() => {
        getRouteMembers(routeId).then((value) => setMembers(value));
    }, [routeId]);

    useEffect(() => {
        if (members && members.length > 0) {
            Promise.all(members.map((member) => getUser(member.memberId)))
                .then((users) => setMembersAccount(users));
        } else {
            setMembersAccount([]);
        }
    }, [members]);

    return (
        <>
            <div className={"bg-white min-h-screen w-screen"}>

                <Navbar previousPage={'dashboard'}/>
                <div className="bg-white text-black m-10">
                    <p className={"text-[#194569] text-4xl font-bold"}>Route to {route?.startAddress.city}</p>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="space-y-4">
                                {membersAccount.map((user, key) => {
                                    getCurrentMember(user.userId);
                                    console.log("in")
                                    console.log(currentMember);
                                    return (
                                        <div
                                            key={key}
                                            className="flex items-start bg-gray-100 p-4 rounded-xl shadow-sm"
                                        >
                                            <div className="w-16 h-16 bg-gray-300 rounded-md mr-4"/>

                                            <div className="flex-1">
                                                <div
                                                    className="font-semibold text-lg">{user.firstname} {user.lastname} - {currentMember?.startAddress.city}</div>
                                                <div className="text-sm text-gray-700">Address: {currentMember?.startAddress.street}</div>
                                                <button
                                                    className="mt-2 px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 text-black space-y-1 text-base">
                                <p>Distance: 54,43 km</p>
                                <p>Estimated fuel consumption: 5 litres</p>
                                <p>Estimated costs (at a price of 1,64€ per litre): <strong>8,2€</strong></p>
                            </div>

                            <button className="mt-4 px-4 py-2 bg-[#194569] text-white rounded-3xl">
                                Export route to Google Maps
                            </button>
                        </div>


                        <div>
                            {/* Map */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RouteDetails;