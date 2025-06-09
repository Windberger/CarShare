import {IAddress, ICoordinateAddress} from "./IAddress.ts";
import {IUser} from "./IUser.ts";
import {IMember} from "./IMember.ts";


export interface IRouteContext {
    routeId: number,
    startAddress: IAddress,
    endAddress: IAddress,
    startTime: Date,
    joinCode: number,
    routeMembers: IUser[]
}

export interface IRoute {
    routeId: number;
    startAddress: IAddress;
    endAddress: IAddress;
    startTime: string;
    driver: IUser;
    joinCode: string
}

export interface IRouteResult {
    addresses: ICoordinateAddress[],
    directionCoordinates: number[][],
    driverId: number,
    duration: number,
    distance: number
}

export interface ICreateRoute {
    startAddressId: number;
    endAddressId: number;
    startTime: string;
    driverId: number;
}