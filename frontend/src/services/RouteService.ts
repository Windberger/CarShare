import apiClient from "./ApiClient.ts";

export const getRoutes = async (userId: number | null) => {
    try {
        const response = await apiClient.post(`/driverRoutes?userId=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getJoinedRoutes = async (userId: number | null) => {
    try {
        const response = await apiClient.post(`/joinedRoutes?userId=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};


