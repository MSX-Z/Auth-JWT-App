import { createContext, useEffect, useMemo, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPathWithAuth, getPathWithOutAuth } from "../../Routes";
import { login, logout } from "../Actions/AuthAction";
import AuthReducer from "../Reducers/AuthReducer";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
    console.log("provider render");
    const location = useLocation();
    const navigate = useNavigate();

    const [stateAuth, dispatchAuth] = useReducer(AuthReducer, { isAuth: false });

    useEffect(() => {
        const { isAuth } = stateAuth;
        const { pathname } = location;
        if (!isAuth) {
            if (!getPathWithOutAuth.includes(pathname))
                navigate('/', { replace: true });
        } else {
            if (!getPathWithAuth.includes(pathname))
                navigate('/home', { replace: true })
        }
    }, []);


    const Login = (callback) => {
        dispatchAuth(login());
        callback();
    }

    const Logout = (callback) => {
        dispatchAuth(logout());
        callback();
    }

    const value = useMemo(() => ({ stateAuth, Login, Logout }), [stateAuth]);

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;