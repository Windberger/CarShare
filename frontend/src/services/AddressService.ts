import apiClient from "./ApiClient.ts";
import {CreateAddress} from "../interfaces/AddressInterfaces.ts";

export const createAddress = async (address: CreateAddress) => {

    const response = await apiClient.post('/address', address, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;

};
