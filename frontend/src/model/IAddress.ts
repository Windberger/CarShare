export interface IAddress {
    addressId: number,
    country: string
    postalCode: string,
    city: string,
    street: string,
    houseNumber: string,
}

export interface ICreateAddress {
    country: string;
    postalCode: string;
    city: string;
    street: string;
    houseNumber: string;
}

export interface ICoordinateAddress {
    addressId: number,
    country: string
    postalCode: number,
    city: string,
    street: string,
    houseNumber: string,
    lat: number,
    lon: number
}