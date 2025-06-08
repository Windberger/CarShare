export interface IUser {
    userId: number,
    email: string,
    firstname: string,
    lastname: string
}

export interface IRegisterUser {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}