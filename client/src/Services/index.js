export const TOKENS = process.env.REACT_APP_TOKENS;

export const getTokens = (key) => {
    return localStorage.getItem(key);
}

export const setTokens = (key, val) => {
    localStorage.setItem(key, val);
}

export const removeTokens = (key) => {
    localStorage.removeItem(key);
}