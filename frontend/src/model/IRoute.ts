import {IAddress} from "./IAddress.ts";
import {IUser} from "./IUser.ts";


export interface IRoute{
    routeId: number,
    startAddress: IAddress,
    endAddress: IAddress,
    startTime: Date,
    joinCode: number,
    routeMembers: IUser[]

}