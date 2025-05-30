import {Address} from "./AddressInterfaces.ts";
import {UserData} from "./UserInterfaces.ts";

export interface CreateRoute {
    startAddressId: number;
    endAddressId: number;
    startTime: string;
    driverId: number;
}

export interface Route {
    routeId: number;
    startAddress: Address;
    endAddress: Address;
    startTime: string;
    driver: UserData;
    joinCode: string
}