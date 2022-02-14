export const LOGIN_TYPE = "LOGIN_TYPE";
export const LOGOUT_TYPE = "LOGOUT_TYPE";

export const login = (id) => ({type: LOGIN_TYPE, payload: id});
export const logout = () => ({type: LOGOUT_TYPE});
