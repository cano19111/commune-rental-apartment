import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
    headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

instance.interceptors.request.use(
    function (config) {
        const localStorageData = localStorage.getItem('ACCESS_TOKEN');
        if (localStorageData && typeof localStorageData === 'string') {
            const token = JSON.parse(localStorageData);
            config.headers = { authorization: `Bearer ${token}` };
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response?.data;
    },
    function (error) {
        return error?.response?.data;
    },
);

export default instance;
