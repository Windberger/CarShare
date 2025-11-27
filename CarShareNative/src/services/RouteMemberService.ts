import apiClient from "./ApiClient";
import {ICreateAddress} from "../model/IAddress";

export const createRouteMember = async (joinCode: string, userId: number, startAddress: ICreateAddress, endAddress: ICreateAddress) => {
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

export const getRouteMembers = async (routeId: number) => {
    const response =  await apiClient.get(`/routeMembers/getMembersOfRoute/${routeId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
}

export const removeRouteMember = async (routeId: number, memberId: number) => {
    const response =  await apiClient.delete(`/routeMembers/removeMemberOfRoute/${routeId}/${memberId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
}