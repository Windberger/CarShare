export interface IAddress {
    addressId: number,
    placeId: string,
    description: string
}

export interface IDetailedAddress {
    addressId: number,
    placeId: string,
    description: string,
    place: string | null,
    street: string,
    city: string,
    country: string,
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

export interface IAutocompleteResponsePlace {
    placeId: string,
    description: string
}

export interface ICoordinate {
    lat: number,
    lng: number
}

export interface ICreateGoogleMapsAddress {
    placeId: string,
    description: string
}