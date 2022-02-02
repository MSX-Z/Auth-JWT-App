import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Services/Contexts/AuthContext";

export default function ProtectRoute() {
    console.log('protect render');
    const { stateAuth } = useAuth();
    const location = useLocation();

    if (!stateAuth) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <Outlet />
}