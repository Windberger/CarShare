import React, {useState, useContext, useEffect} from "react";
import {View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, SafeAreaView} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../../context/UserContext";
import {getJoinedRoutes, getRoutes, routeExists} from "../../services/RouteService";
import RoutesCard from "../../components/RoutesCard.tsx";


export default function Dashboard() {
    const [driverRoutes, setDriverRoutes] = useState<any[]>([]);
    const [joinRoutes, setJoinRoutes] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const navigation = useNavigation();
    const userContext = useContext(UserContext);

    if (!userContext) {
        return (
            <View style={styles.centered}>
                <Text style={{color: "#000"}}>Please log in to access this page</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Homepage" as never)}>
                    <Text style={styles.link}>Back to Homepage</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const {userId} = userContext;

    const getRoutesForCards = (userId: number | null) => {

        if (userId == null) {
            console.error("User ID is null!");
        }

        getRoutes(userId)
            .then((routes) => {
                setDriverRoutes(routes);
            })
            .catch((error) => {
                console.error("Error fetching driver routes:", error);
            });

        getJoinedRoutes(userId)
            .then((routes) => {
                setJoinRoutes(routes);
            })
            .catch((error) => {
                console.error("Error fetching joined routes:", error);
            });
    };
    const setModalOpen = (open: boolean) => {
        setIsModalOpen(open);
    }

    const handleJoinCarpool = () => {
        routeExists(joinCode)
            .then((existing: boolean) => {
                if (existing) {
                    setIsModalOpen(false);
                    navigation.navigate("JoinRoute" as never, {joinCode} as never);
                } else {
                    Alert.alert("This route does not exist");
                }
            })
            .catch((error: any) => {
                if (error?.status === 404) {
                    Alert.alert("A route with this code does not exist!");
                } else {
                    Alert.alert("An unknown error occurred!");
                }
            });
    };

    useEffect(() => {
        if (!userId) return;
        getRoutesForCards(userId);
    }, [userId]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("CreateCarpool" as never)}
                >
                    <Ionicons name="add" size={22} color="#fff"/>
                    <Text style={styles.buttonText}>Add Route</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => setIsModalOpen(true)}
                >
                    <Text style={styles.buttonText}>Join Carpool</Text>
                </TouchableOpacity>
            </View>
            <RoutesCard title="Recent Routes" routes={driverRoutes} setModalOpen={setModalOpen}/>
            <RoutesCard title="Recent Joined Routes" routes={joinRoutes} setModalOpen={setModalOpen}/>
            <Modal
                visible={isModalOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsModalOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Join Code</Text>
                        <TextInput
                            style={styles.input}
                            value={joinCode}
                            onChangeText={setJoinCode}
                            placeholder="Enter join code"
                            placeholderTextColor="#888"
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsModalOpen(false)}
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={handleJoinCarpool}
                            >
                                <Text style={{color: "#fff"}}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#fff", padding: 16},
    centered: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"},
    link: {color: "#194569", marginTop: 8, textDecorationLine: "underline"},
    buttonRow: {flexDirection: "row", justifyContent: "space-between", marginBottom: 16, margin: 5},
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#194569",
        padding: 12,
        borderRadius: 24,
        flex: 1,
        marginRight: 8,
        justifyContent: "center"
    },
    joinButton: {
        backgroundColor: "#194569",
        padding: 12,
        borderRadius: 24,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {color: "#fff", fontWeight: "bold", marginLeft: 6},
    card: {backgroundColor: "#f3f4f6", borderRadius: 12, padding: 12, marginVertical: 8},
    cardTitle: {fontWeight: "bold", fontSize: 16, marginBottom: 8, color: "#194569"},
    routeItem: {color: "#222", paddingVertical: 2},
    emptyText: {color: "#888", fontStyle: "italic"},
    modalOverlay: {flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center"},
    modalContent: {backgroundColor: "#fff", borderRadius: 12, padding: 24, width: "80%"},
    modalTitle: {fontWeight: "bold", fontSize: 18, marginBottom: 12, color: "#194569"},
    input: {borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 16, color: "#000"},
    modalButtons: {flexDirection: "row", justifyContent: "space-between"},
    cancelButton: {backgroundColor: "#eee", padding: 10, borderRadius: 8},
    confirmButton: {backgroundColor: "#194569", padding: 10, borderRadius: 8},
});