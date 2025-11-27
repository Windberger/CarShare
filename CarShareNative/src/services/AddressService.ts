import apiClient from "./ApiClient";
import {ICreateAddress} from "../model/IAddress";

export const createAddress = async (address: ICreateAddress) => {

    const response = await apiClient.post('/address', address, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;

};
