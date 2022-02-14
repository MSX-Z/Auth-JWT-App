import { LOGIN_TYPE, LOGOUT_TYPE } from "../Actions/AuthAction";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_TYPE:
            return { ...state, isAuth: true, id: action.payload };
        case LOGOUT_TYPE:
            return { ...state, isAuth: false, id: -1 };
        default:
            return state;

    }
}
export default authReducer;