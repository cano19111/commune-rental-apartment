import axios from './httpRequest';

export const apiRegister = (data) =>
    axios({
        url: '/auth/register',
        method: 'post',
        data,
    });
export const apiLogin = (data) =>
    axios({
        url: '/auth/login',
        method: 'post',
        data,
    });
