import {IAddress, ICoordinateAddress, ICreateGoogleMapsAddress} from "./IAddress.ts";
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
    addresses: IAddress[],
    routePolyline: string,
    driverId: number,
    duration: number,
    distance: number,
    northEastBound: string,
    southWestBound: string
}

export interface ICreateRoute {
    addresses: ICreateGoogleMapsAddress[];
    startTime: string;
    driverId: number;
}