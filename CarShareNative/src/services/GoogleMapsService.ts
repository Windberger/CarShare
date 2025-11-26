import {ICoordinate, ICreateAddress} from "../model/IAddress";
import apiClient from "./ApiClient";
import {AxiosResponse} from "axios";

export const autocompleteAddress = async (input: string) => {
    const response = await apiClient.get(`/api/places/autocomplete`, {
        params: {input},
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
};

export const geocode = async (coords: ICoordinate) => {
    const response = await apiClient.get(`/api/places/geocode`, {
        params: {lat: coords.lat, lng: coords.lng},
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
}


