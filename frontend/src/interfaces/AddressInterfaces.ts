export interface CreateAddress {
    country: string;
    postalCode: string;
    city: string;
    street: string;
    houseNumber: string;
}

export interface Address {
    addressId: number;
    country: string;
    postalCode: string;
    city: string;
    street: string;
    houseNumber: string;
}