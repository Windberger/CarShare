export interface RegisterUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface UserData {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
}