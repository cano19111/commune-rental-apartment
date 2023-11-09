import axios from './httpRequest';

export const apiGetCurrentUser = () =>
    axios({
        url: '/user/current-user',
        method: 'get',
        withCredentials: true,
    });
