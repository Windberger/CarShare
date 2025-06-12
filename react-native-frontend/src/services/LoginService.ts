import apiClient from "./ApiClient.ts";
import {ILoginUser, IRegisterUser} from "../model/IUser.ts";

export const registerUser = async (userData: IRegisterUser, setUserId: (id: number | null) => void) => {
    const response = await apiClient.post('/signup', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });


    console.log(response.data.userId);

    setUserId(response.data.userId);


    return response.data;
};

export const loginUser = async (userData: ILoginUser, setUserId: (id: number | null) => void) => {
    const response = await apiClient.post('/login', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("logging in user")

    setUserId(response.data.userId);

    return response.data;
};

export const logoutUser = async () => {
    const response = await apiClient.post('/logout', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};