import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const localStorageData = window.localStorage.getItem('rent-apartment');
        if (localStorageData && typeof localStorageData === 'string') {
            const { token } = JSON.parse(localStorageData);
            config.headers = { authorization: `Bearer ${token}` };
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response?.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error?.response?.data;
    },
);

export default instance;
