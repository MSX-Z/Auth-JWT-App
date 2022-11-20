interface IRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    terms: boolean;
}

interface ILogin {
    email: string;
    password: string;
}

export type {
    IRegister,
    ILogin
}