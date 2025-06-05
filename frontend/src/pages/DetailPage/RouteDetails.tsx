import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParams } from "react-router-dom";
import { RouteContext } from "../../context/RouteContext.tsx";
import { getRouteMembers } from "../../services/RouteMemberService.ts";
import { IMember } from "../../model/IMember.ts";
import { IUser } from "../../model/IUser.ts";
import { getUser } from "../../services/UserService.ts";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

function RouteDetails() {
    const { id } = useParams();
    const { recentRoutes, joinedRoutes } = useContext(RouteContext)!;
    const routeId = Number(id);

    const [members, setMembers] = useState<IMember[]>([]);
    const [membersAccount, setMembersAccount] = useState<IUser[]>([]);
    const [startCoord, setStartCoord] = useState<[number, number] | null>(null);
    const [endCoord, setEndCoord] = useState<[number, number] | null>(null);
    const [memberMarkers, setMemberMarkers] = useState<{ type: "pickup" | "dropoff"; coords: [number, number] }[]>([]);
    const [routeCoords, setRouteCoords] = useState<number[][]>([]);

    const route =
        recentRoutes.find((r) => r.routeId === routeId) ||
        joinedRoutes.find((r) => r.routeId === routeId);

    useEffect(() => {
        getRouteMembers(routeId).then(setMembers);
    }, [routeId]);

    useEffect(() => {
        if (members.length > 0) {
            Promise.all(members.map((member) => getUser(member.memberId)))
                .then(setMembersAccount);
        } else {
            setMembersAccount([]);
        }
    }, [members]);

    useEffect(() => {
        const apiKey = "5b3ce3597851110001cf62487256929cc7a9432cb7026f541f531b99";

        const geocode = async (address: any) => {
            const query = `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}`;
            const res = await axios.get(
                "https://api.openrouteservice.org/geocode/search",
                {
                    params: {
                        api_key: apiKey,
                        text: query,
                        size: 1,
                    },
                }
            );
            return res.data.features[0].geometry.coordinates;
        };

        const haversineDistance = (coord1: number[], coord2: number[]) => {
            const toRad = (x: number) => x * Math.PI / 180;
            const [lon1, lat1] = coord1;
            const [lon2, lat2] = coord2;
            const R = 6371;
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        const fetchRouteWithWaypoints = async () => {
            if (!route?.startAddress || !route?.endAddress) return;

            try {
                const start = await geocode(route.startAddress);
                const end = await geocode(route.endAddress);

                const memberCoords = await Promise.all(members.map(async (m) => {
                    const startCoord = await geocode(m.startAddress);
                    const endCoord = await geocode(m.endAddress);
                    return {
                        memberId: m.memberId,
                        start: startCoord,
                        end: endCoord,
                        visited: false,
                    };
                }));

                let currentPos = start;
                const orderedCoords: number[][] = [start];

                while (memberCoords.some(m => !m.visited)) {
                    let nextIdx = -1;
                    let shortest = Infinity;

                    memberCoords.forEach((m, idx) => {
                        if (!m.visited) {
                            const dist = haversineDistance(currentPos, m.start);
                            if (dist < shortest) {
                                shortest = dist;
                                nextIdx = idx;
                            }
                        }
                    });

                    if (nextIdx === -1) break;

                    const next = memberCoords[nextIdx];
                    orderedCoords.push(next.start);
                    orderedCoords.push(next.end);
                    currentPos = next.end;
                    next.visited = true;
                }

                orderedCoords.push(end);

                const res = await axios.post(
                    `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
                    { coordinates: orderedCoords },
                    {
                        headers: {
                            Authorization: apiKey,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setStartCoord([start[1], start[0]]);
                setEndCoord([end[1], end[0]]);
                setRouteCoords(res.data.features[0].geometry.coordinates.map(([lng, lat]: number[]) => [lat, lng]));

                const markers = memberCoords.flatMap(m => [
                    { type: "pickup", coords: [m.start[1], m.start[0]] },
                    { type: "dropoff", coords: [m.end[1], m.end[0]] },
                ]);
                setMemberMarkers(markers);

            } catch (err) {
                console.error("Routing error:", err);
            }
        };

        fetchRouteWithWaypoints();
    }, [route, members]);

    return (
        <div className="bg-white min-h-screen w-screen">
            <Navbar previousPage="dashboard" />

            <div className="bg-white text-black m-10">
                <p className="text-[#194569] text-4xl font-bold">
                    Route to {route?.startAddress.city}
                </p>

                <div className="mt-2">
                    <p>Start Address: {route?.startAddress.street} {route?.startAddress.houseNumber}, {route?.startAddress.postalCode} {route?.startAddress.city}</p>
                    <p>End Address: {route?.endAddress.street} {route?.endAddress.houseNumber}, {route?.endAddress.postalCode} {route?.endAddress.city}</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4 mt-6">
                        {membersAccount.map((user, key) => {
                            const member = members.find((m) => m.memberId === user.userId);
                            return (
                                <div key={key} className="flex items-center bg-gray-100 p-4 rounded-xl shadow-sm justify-between">
                                    <div className="flex-1">
                                        <div className="font-semibold text-lg">
                                            {user.firstname} {user.lastname} - {member?.endAddress.city}
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            Pick-up: {member?.startAddress.street} {member?.startAddress.addressId}, {member?.startAddress.postalCode} {member?.startAddress.city}
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            Drop-off: {member?.endAddress.street} {member?.endAddress.addressId}, {member?.endAddress.postalCode} {member?.endAddress.city}
                                        </div>
                                    </div>
                                    <button className="ml-4 px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="space-y-4 mt-6">
                        <MapContainer
                            center={[47.03, 15.46]}
                            zoom={12}
                            scrollWheelZoom
                            style={{ height: "500px", width: "100%", borderRadius: "1rem" }}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {routeCoords.length > 0 && (
                                <>
                                    <Polyline positions={routeCoords} color="blue" weight={5} />
                                    {startCoord && <Marker position={startCoord} />}
                                    {endCoord && <Marker position={endCoord} />}
                                </>
                            )}

                            {memberMarkers.map((m, idx) => (
                                <Marker key={idx} position={m.coords}>
                                    <Popup>{m.type === "pickup" ? "Pick-up" : "Drop-off"}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    <div className="mt-6 text-black space-y-1 text-base">
                        <p>Distance: 54,43 km</p>
                        <p>Estimated fuel consumption: 5 litres</p>
                        <p>Estimated costs (at a price of 1,64€ per litre): <strong>8,2€</strong></p>
                        <button className="mt-4 px-4 py-2 bg-[#194569] text-white rounded-3xl">
                            Export route to Google Maps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RouteDetails;
