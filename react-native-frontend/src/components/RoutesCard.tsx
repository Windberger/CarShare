import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IRouteContext } from "../model/IRoute";

interface RoutesCardProps {
    title: string;
    routes: IRouteContext[];
    setModalOpen: (open: boolean) => void;
}

const RoutesCard: React.FC<RoutesCardProps> = ({ title, routes, setModalOpen }) => {
    const navigation = useNavigation<any>();
    console.log("Routes für", title, routes);

    function handleClick(id: number) {
        navigation.navigate("DetailRoute", { id });
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            {routes.length === 0 ? (
                <View>
                    {title === "Recent Routes" ? (
                        <View>
                            <Text style={styles.infoText}>You don't have created a route yet</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("CreateCarpool")}>
                                <Text style={styles.link}>Create a new route</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.infoText}>You haven't joined a route yet</Text>
                            <TouchableOpacity onPress={() => setModalOpen(true)}>
                                <Text style={styles.link}>Join a route</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ) : (
                <FlatList
                    data={routes}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.routeItem}
                            onPress={() => handleClick(item.routeId)}
                        >
                            <Text style={styles.routeText}>
                                From {item.startAddress.city} to {item.endAddress.city}
                            </Text>
                            <Text style={styles.joinCode}>Join Code: {item.joinCode}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#f3f4f6",
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    cardTitle: {
        color: "#194569",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    infoText: {
        color: "#222",
        marginBottom: 4,
    },
    link: {
        color: "#194569",
        textDecorationLine: "underline",
        marginTop: 4,
    },
    routeItem: {
        backgroundColor: "#e5e7eb",
        marginVertical: 4,
        padding: 12,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    routeText: {
        flex: 1,
        color: "#222",
        marginRight: 8,
    },
    joinCode: {
        color: "#194569",
        fontWeight: "bold",
        textAlign: "right",
        minWidth: 90,
    },
});

export default RoutesCard;