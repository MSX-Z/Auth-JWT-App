export const TOKENS = process.env.REACT_APP_TOKENS || "tokens";

export const getTokens = (key: string) => {
    return localStorage.getItem(key);
}

export const setTokens = (key: string, val: string) => {
    localStorage.setItem(key, val);
}

export const removeTokens = (key: string) => {
    localStorage.removeItem(key);
}