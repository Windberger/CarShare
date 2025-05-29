import apiClient from "./ApiClient.ts";
import {CreateRoute} from "../interfaces/RouteInterfaces.ts";

export const getRoutes = async (userId: number | null) => {
        const response = await apiClient.get(`/routes/driverRoutes?userId=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        return response.data;
};


export const getJoinedRoutes = async (userId: number | null) => {
        const response = await apiClient.get(`/routes/joinedRoutes?userId=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        return response.data;
};

export const createRoute = async (route: CreateRoute) => {

    const response = await apiClient.post('/routes/createRoute', route, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};

export const getRouteByJoinCode = async (joinCode: string) => {
    const response = await apiClient.get(`/routes/joinCode?joinCode=${joinCode}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};


