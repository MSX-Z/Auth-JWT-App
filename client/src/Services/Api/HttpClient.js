import { TOKENS, getTokens, setTokens } from "../../Utils";
import Api from "./index";

const instance = Api.create();
instance.interceptors.request.use((config) => {
    const accessToken = JSON.parse(getTokens(TOKENS))?.accessToken
    if (!accessToken)
        return config;
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
        if (!status && message.message === 'jwt expired' && !config._retry) {
            config._retry = true;
            const refreshToken = JSON.parse(getTokens(TOKENS))?.refreshToken;
            if (!refreshToken){
                config._retry = false;
                return Promise.reject(error);
            }
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