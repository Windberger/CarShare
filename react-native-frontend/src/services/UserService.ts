import apiClient from "./ApiClient.ts";

export const getUser = async (userId: number | null) => {
    const response = await apiClient.get(`/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};