import apiClient from "./ApiClient.ts";
import {LoginUser, RegisterUser} from "../interfaces/UserInterfaces.ts";

export const registerUser = async (userData: RegisterUser, setUserId: (id: number | null) => void) => {
    try {
        const response = await apiClient.post('/signup', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });


        console.log(response.data.userId);

        setUserId(response.data.userId);


        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData: LoginUser, setUserId: (id: number | null) => void) => {
    try {
        const response = await apiClient.post('/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("logging in user")

        setUserId(response.data.userId);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    const response = await apiClient.post('/logout', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};