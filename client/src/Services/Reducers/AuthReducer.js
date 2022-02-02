import { LOGIN_TYPE, LOGOUT_TYPE } from "../Actions/AuthAction";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_TYPE:
            return { ...state, isAuth: true };
        case LOGOUT_TYPE:
            return { ...state, isAuth: false };
        default:
            return state;

    }
}
export default authReducer;