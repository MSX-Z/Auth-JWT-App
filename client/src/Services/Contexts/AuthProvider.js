import { createContext, useEffect, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../Actions/AuthAction";
import AuthReducer from "../Reducers/AuthReducer";
import { ACCESS_TOKEN, getTokens } from "../util";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
    const navigate = useNavigate();
    const [stateAuth, dispatchAuth] = useReducer(AuthReducer, { isAuth: false });
    console.log("provider render", stateAuth.isAuth);

    const Login = (callback) => {
        dispatchAuth(login());
        callback();
    }

    const Logout = (callback) => {
        dispatchAuth(logout());
        callback();
    }

    useEffect(() => {
        const accessToken = getTokens(ACCESS_TOKEN);
        if (accessToken) {
            Login(() => {
                navigate('/home', { replace: true });
            })
        }
    }, []);

    const value = useMemo(() => ({ stateAuth, Login, Logout }), [stateAuth]);

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;