import apiClient from "./ApiClient.ts";

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


