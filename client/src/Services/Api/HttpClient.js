import Api from "./index";

const instance = Api.create();
instance.interceptors.request.use((config) => {
    config.headers = {
        'Authorization': 'Bearer 1234',
    }
    return config;
})

export default instance;