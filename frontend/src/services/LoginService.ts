import apiClient from "./ApiClient.ts";
import {LoginUser, RegisterUser} from "../interfaces/UserInterfaces.ts";

export const registerUser = async (userData: RegisterUser) => {
    try {
        const response = await apiClient.post('/signup', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData: LoginUser) => {
    try {
        const response = await apiClient.post('/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    await apiClient.post('/logout', {}, {
        withCredentials: true,
    });
}