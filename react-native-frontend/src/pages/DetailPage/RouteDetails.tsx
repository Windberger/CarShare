import React, {useContext, useState, useEffect} from "react";
import {View, Text, Button, Alert, ScrollView, StyleSheet, TouchableOpacity, Linking} from "react-native";
import {UserContext} from "../../context/UserContext";
import {getRouteMembers, removeRouteMember} from "../../services/RouteMemberService";
import {getUser} from "../../services/UserService";
import {calculateRoute, deleteRouteById, getRouteById} from "../../services/RouteService";
import {useNavigation, useRoute} from "@react-navigation/native";
import {IRoute, IRouteResult} from "../../model/IRoute.ts";
import {IUser} from "../../model/IUser.ts";
import {IMember} from "../../model/IMember.ts";

function CustomButton({ title, onPress, color = "#194569", disabled = false }: { title: string, onPress: () => void, color?: string, disabled?: boolean }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.customButton,
                { backgroundColor: disabled ? "#b0b0b0" : color }
            ]}
            activeOpacity={0.8}
        >
            <Text style={styles.customButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}
import LeafletMap from "../../components/LeafletMap";

type LatLng = { latitude: number; longitude: number };

export default function RouteDetails() {
    const navigation = useNavigation<any>();
    const routeParams = useRoute();
    // @ts-ignore
    const routeId = Number(routeParams.params?.id);

    const [members, setMembers] = useState<IMember[]>([]);
    const [membersAccount, setMembersAccount] = useState<IUser[]>([]);
    const [routeResult, setRouteResult] = useState<IRouteResult | null>(null);
    const [startCoords, setStartCoords] = useState<LatLng>({latitude: 47.05, longitude: 15.43});
    const [endCoords, setEndCoords] = useState<LatLng | null>(null);
    const [routeSteps, setRouteSteps] = useState<LatLng[]>([]);
    const [route, setRoute] = useState<IRoute | null>(null);
    const [dateString, setDateString] = useState<string>("");
    const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
    const [memberMarkers, setMemberMarkers] = useState<
        { type: string; coords: LatLng; memberId: number }[]
    >([]);

    const userContext = useContext(UserContext);
    if (!userContext) {
        return <Text>Bitte einloggen</Text>;
    }
    const {userId} = userContext;

    const exportToGoogleMaps = () => {
        if (!routeSteps.length) return;
        let url = `https://www.google.com/maps/dir/`;
        routeSteps.forEach((step) => {
            url += `${step.latitude},${step.longitude}/`;
        });
        Linking.openURL(url);
    };

    const removeMember = (memberId: number) => {
        let removeMemberId = memberId;
        if (routeResult && userId && userId !== routeResult.driverId) {
            removeMemberId = userId;
        }
        removeRouteMember(routeId, removeMemberId).then(() => {
            if (routeResult && userId === removeMemberId) {
                navigation.navigate("Dashboard");
            } else {
                fetchRouteMembers();
            }
        }).catch(() => {
            Alert.alert("Fehler beim Entfernen des Mitglieds");
        });
    };

    const calculate = (members: IMember[]) => {
        calculateRoute(routeId).then((result: IRouteResult) => {
            setRouteResult(result);

            const coords: LatLng[] = result.addresses.map(addr => ({
                latitude: addr.lat,
                longitude: addr.lon
            }));
            setRouteCoords(result.directionCoordinates.map(([lon, lat]) => ({
                latitude: lat,
                longitude: lon
            })));
            setStartCoords(coords[0]);
            setEndCoords(coords[coords.length - 1]);
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
                if (!member) return null;
                return {
                    type: type,
                    coords: {latitude: step.lat, longitude: step.lon},
                    memberId: member.memberId,
                };
            }).filter(Boolean) as { type: string; coords: LatLng; memberId: number }[];

            // Entferne ersten und letzten Marker (Start/Ziel)
            if (markers.length > 2) markers = markers.slice(1, -1);

            setMemberMarkers(markers);
        }).catch(() => {
            Alert.alert("Fehler bei der Routenberechnung");
        });
    };

    const fetchRouteMembers = () => {
        getRouteById(routeId).then((route: IRoute) => {
            setRoute(route);

            const formatted = new Intl.DateTimeFormat("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }).format(new Date(Date.parse(route.startTime)));
            setDateString(formatted);

            getRouteMembers(routeId).then((memberResponse: IMember[]) => {
                setMembers(memberResponse);
                calculate(memberResponse);
            });
        }).catch(() => {
            Alert.alert("Fehler beim Laden der Route");
        });
    };

    const deleteRoute = () => {
        if (routeResult && userId !== routeResult.driverId) {
            return;
        }
        Alert.alert(
            "Route löschen",
            "Bist du sicher?",
            [
                {text: "Abbrechen", style: "cancel"},
                {
                    text: "Löschen", style: "destructive", onPress: () => {
                        deleteRouteById(routeId).then(() => {
                            navigation.navigate("Dashboard");
                        }).catch(() => {
                            Alert.alert("Fehler beim Löschen");
                        });
                    }
                }
            ]
        );
    };

    useEffect(() => {
        fetchRouteMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Route nach {route?.endAddress?.city}</Text>
            <Text>Startzeit: {dateString}</Text>
            <Text>Start: {route?.startAddress?.street} {route?.startAddress?.houseNumber}, {route?.startAddress?.postalCode} {route?.startAddress?.city}</Text>
            <Text>Ziel: {route?.endAddress?.street} {route?.endAddress?.houseNumber}, {route?.endAddress?.postalCode} {route?.endAddress?.city}</Text>
            <Text>Join Code: {route?.joinCode}</Text>
            {routeResult && userId === routeResult.driverId ? (
                <CustomButton title="Route löschen" color="#e74c3c" onPress={deleteRoute} />
            ) : (
                <CustomButton title="Route verlassen" color="#e74c3c" onPress={() => userId && removeMember(userId)} />
            )}
            <Text style={styles.subtitle}>Mitglieder</Text>
            {membersAccount.map((user, key) => {
                const member = members.find((m) => m.memberId === user.userId);
                return (
                    <View key={key} style={styles.memberCard}>
                        <Text
                            style={styles.memberName}>{user.firstname} {user.lastname} - {member?.endAddress?.city}</Text>
                        <Text>Pick-up: {member?.startAddress?.street} {member?.startAddress?.houseNumber}, {member?.startAddress?.postalCode} {member?.startAddress?.city}</Text>
                        <Text>Drop-off: {member?.endAddress?.street} {member?.endAddress?.houseNumber}, {member?.endAddress?.postalCode} {member?.endAddress?.city}</Text>
                        {routeResult && userId === routeResult.driverId && member && (
                            <TouchableOpacity onPress={() => removeMember(member.memberId)}>
                                <Text style={styles.removeBtn}>Entfernen</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            })}
            <Text>Distanz: {routeResult ? `${Math.round(routeResult.distance / 1000)} km` : "Berechne..."}</Text>
            <Text>Dauer: {routeResult ? `${Math.floor(routeResult.duration / 60)} min` : "Berechne..."}</Text>
            <CustomButton
                title="Route in Google Maps öffnen"
                onPress={exportToGoogleMaps}
                disabled={!routeResult}
            />
            <View style={styles.map}>
                <LeafletMap
                    routeCoords={routeCoords}
                    startCoords={startCoords}
                    endCoords={endCoords}
                    memberMarkers={memberMarkers}
                    membersAccount={membersAccount}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#fff", padding: 16},
    title: {fontSize: 24, fontWeight: "bold", color: "#194569", marginBottom: 8},
    subtitle: {fontSize: 18, fontWeight: "bold", marginTop: 16},
    memberCard: {backgroundColor: "#f3f4f6", borderRadius: 12, padding: 12, marginVertical: 8},
    memberName: {fontWeight: "bold", fontSize: 16},
    removeBtn: {color: "#194569", marginTop: 4, borderRadius: 12},
    map: {height: 300, width: "100%", borderRadius: 12, marginTop: 16},
    customButton: {
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    customButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 0.5,
    },
});