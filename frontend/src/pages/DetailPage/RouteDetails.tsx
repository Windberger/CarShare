import {useContext, useState, useEffect} from "react";
import Navbar from "../../components/Navbar.tsx";
import {useParams} from "react-router-dom";
import {RouteContext} from "../../context/RouteContext.tsx";
import {getRouteMembers, removeRouteMember} from "../../services/RouteMemberService.ts";
import {IMember} from "../../model/IMember.ts";
import {IUser} from "../../model/IUser.ts";
import {getUser} from "../../services/UserService.ts";
import {MapContainer, TileLayer, Polyline, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {IRouteResult} from "../../model/IRoute.ts";
import {calculateRoute, deleteRouteById} from "../../services/RouteService.ts";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.tsx";


/**
 * @author Johanna Hechtl
 * @since 02.06.2025
 */



// @ts-ignore
function RouteDetails() {
    const {id} = useParams();
    const {recentRoutes, joinedRoutes} = useContext(RouteContext)!;
    const routeId = Number(id);
    const navigate = useNavigate();


    const [members, setMembers] = useState<IMember[]>([]);
    const [membersAccount, setMembersAccount] = useState<IUser[]>([]);
    const [routeResult, setRouteResult] = useState<IRouteResult | null>(null)
    const [startCoords, setStartCoords] = useState<[number, number] | null>([47.05, 15.43]);
    const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
    const [routeSteps, setRouteSteps] = useState<number[][]>([]);
    const [memberMarkers, setMemberMarkers] = useState<{
        type: string;
        coords: number[];
        memberId: number
    }[]>([]);
    const [routeCoords, setRouteCoords] = useState<number[][]>([]);

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("Context not found");
    }
    const {userId} = userContext;

    const route =
        recentRoutes.find((r) => r.routeId === routeId) ||
        joinedRoutes.find((r) => r.routeId === routeId);


    const exportToGoogleMaps = () => {
        if (!routeSteps) return;

        let url = `https://www.google.com/maps/dir/`;

        routeSteps.forEach((step) => {
            url += step[0] + ',' + step[1] + "/";
        });

        window.open(url, '_blank');
    }
    const removeMember = (memberId: number) => {
        if(routeResult && userId !== routeResult.driverId) {
            return;
        }
        removeRouteMember(routeId, memberId).then(() => {
            console.log("Member removed successfully: " + memberId);
            fetchRouteMembers();
        }).catch((error) => {
            console.error("Error removing member:", error);
        })
    }

    const calculate = (members: IMember[]) => {
        calculateRoute(routeId).then((result: IRouteResult) => {
            setRouteResult(result);

            const coords = result.addresses.map(addr => [addr.lon, addr.lat]);
            setRouteCoords(result.directionCoordinates);
            setStartCoords([coords[0][0], coords[0][1]]);
            setEndCoords([coords[coords.length - 1][0], coords[coords.length - 1][1]]);
            setRouteSteps(coords);

            let markers = result.addresses.map(step => {
                let type = "";
                const member = members.find(m => {
                    const start = m.startAddress;
                    const end = m.endAddress;
                    if (start.addressId === step.addressId) {
                        type = "pickup";
                    } else if (end.addressId === step.addressId) {
                        type = "dropoff";
                    }

                    return start.addressId === step.addressId || end.addressId === step.addressId;
                });

                if (!member) return [];
                return (
                    {
                        type: type,
                        coords: [step.lon, step.lat],
                        memberId: member.memberId,
                    }
                );
            });

            // remove the first and last marker element of the array
            markers = markers.filter((_marker, index) => {
                return index !== 0 && index !== markers.length - 1;
            });

            
            
            setMemberMarkers(markers);
        }).catch((error) => {
            alert("Error calculating route: " + error.response.data.body.detail);
        });
    }

    const fetchRouteMembers = () => {
        getRouteMembers(routeId).then((memberResponse: IMember[]) => {
            setMembers(memberResponse);
            calculate(memberResponse);
        });
    }

    const deleteRoute = () => {
        if (!window.confirm("Are you sure you want to delete this route?")
        || (routeResult && userId !== routeResult.driverId)) {
            return;
        }

        deleteRouteById(routeId).then(() => {
            navigate("/dashboard");
        }).catch((error) => {
            console.error("Error deleting route:", error);
            alert("An error occurred while deleting the route.");
        });
    }

    useEffect(() => {
        fetchRouteMembers();
    }, [routeId]);

    useEffect(() => {
        if (members.length > 0) {
            Promise.all(members.map((member) => getUser(member.memberId)))
                .then(setMembersAccount);
        } else {
            setMembersAccount([]);
        }
    }, [members]);

    
    return (
        <div className="bg-white min-h-screen w-screen overflow-x-hidden">
            <Navbar previousPage="dashboard"/>

            <div className="bg-white text-black m-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[#194569] text-4xl font-bold">
                            Route to {route?.endAddress.city}
                        </p>

                        <div className="mt-2">
                            <p>Start
                                Address: {route?.startAddress.street} {route?.startAddress.houseNumber}, {route?.startAddress.postalCode} {route?.startAddress.city}</p>
                            <p>End
                                Address: {route?.endAddress.street} {route?.endAddress.houseNumber}, {route?.endAddress.postalCode} {route?.endAddress.city}</p>
                        </div>
                    </div>
                    {
                        routeResult &&
                        userId == routeResult.driverId &&
                        <button
                            onClick={deleteRoute}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mt-5 rounded-xl"
                        >
                            Delete Route
                        </button>

                    }
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="space-y-4 mt-6">
                            {membersAccount.map((user, key) => {
                                const member = members.find((m) => m.memberId === user.userId);
                                return (
                                    <div key={key}
                                         className="flex items-center bg-gray-100 p-4 rounded-xl shadow-sm justify-between">
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
                                        {
                                            routeResult &&
                                            userId == routeResult.driverId &&
                                            <button
                                                className="ml-4 px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                                                onClick={() => removeMember(member!.memberId)}
                                            >
                                                Remove
                                            </button>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-14 text-black space-y-1 text-base">
                            <p>Distance:
                                <strong>
                                    {routeResult ? ` ${Math.round(routeResult.distance / 1000)} km` : " Calculating..."}
                                </strong>
                            </p>
                            <p>Estimated time:
                                <strong>
                                    {routeResult ? (Math.round(routeResult.duration / 60) >= 60 ? ` ${Math.floor(routeResult.duration / 60 / 60)} hours,` : "")
                                        + ` ${Math.round(routeResult.duration / 60) % 60} minutes` : " Calculating..."}
                                </strong>
                            </p>
                            <button className="px-4 py-2 bg-[#194569] text-white rounded-xl shadow"
                                    onClick={exportToGoogleMaps}
                                    disabled={!routeResult}
                            >
                                Export route to Google Maps
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6">
                        <MapContainer
                            center={startCoords}
                            zoom={12}
                            scrollWheelZoom
                            style={{height: "550px", width: "100%", borderRadius: "1rem"}}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {routeCoords.length > 0 && (
                                <>
                                    <Polyline positions={routeCoords} color="blue" weight={5}/>
                                    {startCoords &&
                                        <Marker position={startCoords}>
                                            <Popup>
                                                Start
                                            </Popup>
                                        </Marker>
                                    }
                                    {endCoords &&
                                        <Marker position={endCoords}>
                                            <Popup>
                                                Destination
                                            </Popup>
                                        </Marker>
                                    }
                                </>
                            )}

                            {
                                memberMarkers.map((m, idx) => {
                                    const user = membersAccount.find(u => u.userId === m.memberId);
                                    return (
                                        <Marker key={idx} position={m.coords}>
                                            <Popup>
                                                {m.type === "pickup" ? "Pick-up" : "Drop-off"} - {user?.firstname} {user?.lastname}
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            }
                        </MapContainer>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default RouteDetails;
