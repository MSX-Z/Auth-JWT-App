export enum AuthActions {
    LOGIN_TYPE = "LOGIN_TYPE",
    LOGOUT_TYPE = "LOGOUT_TYPE"
}

interface IAuthAction {
    type: AuthActions;
    payload?: number;
}

export type { IAuthAction }