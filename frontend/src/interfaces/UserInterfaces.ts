export interface RegisterUser {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface UserData {
    userId: number;
    email: string;
    firstname: string;
    lastname: string;
}