import { IAuth } from "../Reducers/type";

type ICallbackFunction = () => void;

interface IAuthProvider{
    stateAuth: IAuth; 
    login: (id: number, callback: ICallbackFunction) => void;
    logout: (callback: ICallbackFunction) => void;
}

export type { ICallbackFunction, IAuthProvider };