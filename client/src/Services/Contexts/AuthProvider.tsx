import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAction, logoutAction } from "../Actions/AuthAction";
import AuthReducer from "../Reducers/AuthReducer";
import { TOKENS, getTokens, removeTokens } from "..";
import { isRouteWithOutAuth } from "../../Routes";
import HttpClient from "../Api/Axios/axios";
import { initAuth } from "../Reducers/constant";
import { IAuthProvider, ICallbackFunction } from "./type";

type Props = {
    children?: JSX.Element;
}

export const AuthContext = createContext<IAuthProvider | null>(null);

function AuthProvider(props: Props) {
    const [stateAuth, dispatchAuth] = useReducer(AuthReducer, initAuth);
    const [isLoad, setIsLoad] = useState(() => !getTokens(TOKENS));
    console.log("provider render", stateAuth.isAuth);

    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;

    const login = useCallback((id: number, callback: ICallbackFunction) => {
        dispatchAuth(loginAction(id));
        callback();
    }, []);

    const logout = useCallback((callback: ICallbackFunction) => {
        dispatchAuth(logoutAction());
        callback();
    }, []);

    useEffect(() => {
        (async () => {
            const tokens = JSON.parse(getTokens(TOKENS) ?? "");
            const accessToken = tokens?.accessToken;
            const refreshToken = tokens?.refreshToken;
            if (accessToken && refreshToken) {
                try {
                    const response = await HttpClient.get('/auth');
                    const { status, message, data: { id } } = response.data;
                    if (status && message === 'Token valid') {
                        login(id, () => {
                            navigate(isRouteWithOutAuth(pathname) ? '/home' : pathname, { replace: true });
                        });
                    }
                } catch (error) {
                    if (error.response) {
                        const { status, message } = error.response.data;
                        if (!status && message === "Unauthorized") {
                            removeTokens(TOKENS);
                            logout(() => {
                                navigate('/', { replace: true });
                            });
                        }
                    }
                    console.log("error", error.name);
                }
            }
            setIsLoad(true);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value: IAuthProvider = useMemo(() => ({ stateAuth, login, logout }), [stateAuth, login, logout]);

    return (
        <AuthContext.Provider value={value} >
            {isLoad && props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;