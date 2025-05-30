import apiClient from "./ApiClient.ts";
import {CreateAddress} from "../interfaces/AddressInterfaces.ts";

export const createRouteMember = async (joinCode: string, userId: number, startAddress: CreateAddress, endAddress: CreateAddress) => {
    return await apiClient.post('/routeMembers/addRouteMember', {
        joinCode,
        userId,
        startAddress,
        endAddress
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
};