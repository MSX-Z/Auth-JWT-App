import { AuthActions, IAuthAction } from "./type";

export const loginAction = (id: number): IAuthAction => ({type: AuthActions.LOGIN_TYPE, payload: id});
export const logoutAction = (): IAuthAction => ({type: AuthActions.LOGOUT_TYPE});
