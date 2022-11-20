import { AuthActions, IAuthAction } from "../Actions/type";
import { IAuth } from "./type";

const authReducer = (state: IAuth, action: IAuthAction) => {
    switch (action.type) {
        case AuthActions.LOGIN_TYPE:
            return { ...state, isAuth: true, id: action.payload ?? -1 };
        case AuthActions.LOGOUT_TYPE:
            return { ...state, isAuth: false, id: -1 };
        default:
            return state;

    }
}
export default authReducer;