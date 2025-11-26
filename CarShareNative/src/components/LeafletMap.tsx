import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = { latitude: number; longitude: number };
interface Props {
    routeCoords: LatLng[];
    startCoords: LatLng;
    endCoords: LatLng | null;
    memberMarkers: { type: string; coords: LatLng; memberId: number }[];
    membersAccount?: any[];
}

export default function LeafletMap({ routeCoords, startCoords, endCoords, memberMarkers, membersAccount }: Props) {
    return (
        <MapContainer
            center={[startCoords.latitude, startCoords.longitude]}
            zoom={12}
            style={{ height: "100%", width: "100%", borderRadius: 12 }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {routeCoords.length > 0 && (
                <Polyline positions={routeCoords.map(c => [c.longitude, c.latitude])} color="#194569" />
            )}
            <Marker position={[startCoords.longitude, startCoords.latitude]}>
                <Popup>Start</Popup>
            </Marker>
            {endCoords && (
                <Marker position={[endCoords.longitude, endCoords.latitude]}>
                    <Popup>Ziel</Popup>
                </Marker>
            )}
            {memberMarkers.map((m, idx) => {
                const user = membersAccount?.find(u => u.userId === m.memberId);
                return (
                    <Marker key={idx} position={[m.coords.longitude, m.coords.latitude]}>
                        <Popup>
                            {m.type === "pickup" ? "Pick-up" : "Drop-off"}
                            {user ? `: ${user.firstname} ${user.lastname}` : ""}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}