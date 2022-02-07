import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, logout } from "../Actions/AuthAction";
import AuthReducer from "../Reducers/AuthReducer";
import { ACCESS_TOKEN, getTokens, REFRESH_TOKEN } from "../../Utils";
import { isRouteWithOutAuth } from "../../Routes";
import HttpClient from "../Api/HttpClient";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [first, setfirst] = useState(false);
    const [stateAuth, dispatchAuth] = useReducer(AuthReducer, { isAuth: false });

    const { pathname } = location;

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
        (async () => {
            const accessToken = getTokens(ACCESS_TOKEN);
            const refreshToken = getTokens(REFRESH_TOKEN);
            if (accessToken && refreshToken) {
                try {
                    const response = await HttpClient.get('/auth');
                    const { status } = response.data;
                    if (status) {
                        Login(() => {
                            navigate(isRouteWithOutAuth(pathname) ? '/home' : pathname, { replace: true });
                        })
                    }
                } catch (error) {
                    console.log("error", error?.response?.data);
                }
            }
        })();
    }, []);

    const value = useMemo(() => ({ stateAuth, Login, Logout }), [stateAuth]);

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;