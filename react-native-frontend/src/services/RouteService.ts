import apiClient from "./ApiClient.ts";
import {ICreateRoute} from "../model/IRoute.ts";

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

export const createRoute = async (route: ICreateRoute) => {

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

export const getRouteById = async (routeId: number) => {
    const response = await apiClient.get(`/routes/${routeId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
}

export const routeExists = async (joinCode: string) => {
    const response = await apiClient.get(`/routes/routeExists?joinCode=${joinCode}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};

export const calculateRoute = async (routeId: number) => {
    const response = await apiClient.get(`/calculate/${routeId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};

export const deleteRouteById = async (routeId: number) => {
    const response = await apiClient.delete(`/routes/deleteRoute/${routeId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};


