import {IAddress} from "./IAddress.ts";


export interface IRoute{
    routeId: number,
    startAddress: IAddress,
    endAddress: IAddress,
    startTime: Date,
    joinCode: number

}