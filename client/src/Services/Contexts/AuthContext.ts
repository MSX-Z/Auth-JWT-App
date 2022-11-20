import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { IAuthProvider } from "./type";

export function useAuth() {
    return useContext<IAuthProvider | null>(AuthContext);
}