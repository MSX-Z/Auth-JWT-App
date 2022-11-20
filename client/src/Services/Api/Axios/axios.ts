import { TOKENS, getTokens, setTokens } from "../..";
import Api from "./index";

const instance = Api.create();
instance.interceptors.request.use((config) => {
    let tokens = getTokens(TOKENS);
    if (!tokens){
        return config;
    }
    const accessToken = JSON.parse(tokens).accessToken
    config.headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error.response) {
        const config = error.config;
        const { status, message } = error.response.data
        if (!status && message === 'jwt expired' && !config._retry) {
            config._retry = true;
            let tokens = getTokens(TOKENS);

            if (!tokens) {
                config._retry = false;
                return Promise.reject(error);
            }
            
            const refreshToken = JSON.parse(tokens).refreshToken;
            const payload = { token: refreshToken };
            try {
                const response = await Api.post('/refresh_token', payload);
                const { data } = response.data;
                setTokens(TOKENS, JSON.stringify(data));
                return instance(config);
            } catch (error) {
                config._retry = false;
                return Promise.reject(error);
            }
        }
    }
    return Promise.reject(error);
});

export default instance;