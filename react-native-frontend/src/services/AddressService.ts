import apiClient from "./ApiClient.ts";
import {ICreateAddress} from "../model/IAddress.ts";

export const createAddress = async (address: ICreateAddress) => {

    const response = await apiClient.post('/address', address, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;

};
