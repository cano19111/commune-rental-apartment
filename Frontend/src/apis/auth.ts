import axios from './httpRequest';

export const apiRegister = (data) =>
    axios({
        url: '/auth/register',
        method: 'post',
        data,
        withCredentials: true,
    });
export const apiLogin = (data) =>
    axios({
        url: '/auth/login',
        method: 'post',
        data,
    });
