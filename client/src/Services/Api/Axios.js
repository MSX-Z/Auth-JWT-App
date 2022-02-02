import axios from 'axios';

const configOption = {
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-Type': 'application/json',
    }
}

const api = axios.create(configOption);

export default api;