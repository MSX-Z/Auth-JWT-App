import { ACCESS_TOKEN, getTokens, REFRESH_TOKEN, setTokens } from "../../Utils";
import Api from "./index";

const instance = Api.create();
instance.interceptors.request.use((config) => {
    const accessToken = getTokens(ACCESS_TOKEN);
    config.headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    return config;
}, (error) => {
    console.log("errorIn1", error);
    return Promise.reject(error);
})

instance.interceptors.response.use((response) => {
    console.log("dataIn", response.data);
    return response;
}, async (error) => {
    if (error.response) {
        const { status, message } = error.response.data
        if (!status && message?.message === 'jwt expired') {
            const payload = { token: getTokens(REFRESH_TOKEN) };
            try {
                const response = await Api.post('/refresh_token', payload);
                const { data: { accessToken, refreshToken } } = response.data;
                setTokens(ACCESS_TOKEN, accessToken);                
                setTokens(REFRESH_TOKEN, refreshToken);                
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
    return Promise.reject(error);
});

export default instance;