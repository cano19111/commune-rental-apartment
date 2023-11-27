import axios from './httpRequest';

export const apiGetCurrentUser = () =>
    axios({
        url: '/user/current-user',
        method: 'get',
        withCredentials: true,
    });

export const apiEditUser = (data) =>
    axios({
        url: '/user',
        method: 'put',
        data,
        withCredentials: true,
    });
