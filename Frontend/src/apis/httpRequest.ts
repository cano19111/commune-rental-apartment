import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

instance.interceptors.request.use(
    function (config) {
        const localStorageData = localStorage.getItem('ACCESS_TOKEN');
        if (localStorageData && typeof localStorageData === 'string') {
            const token = JSON.parse(localStorageData);

            // Use 'any' to handle any type mismatch
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`,
            } as any;
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
