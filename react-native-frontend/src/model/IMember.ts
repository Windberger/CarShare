import {IAddress} from "./IAddress.ts";

export interface IMember {
    routeId: number,
    memberId: number,
    startAddress: IAddress,
    endAddress: IAddress
}