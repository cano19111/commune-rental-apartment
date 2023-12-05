import axios from './httpRequest';

export const apiGetCurrentUser = () =>
    axios({
        url: '/user/current-user',
        method: 'get',
    });

export const apiEditUser = (data) =>
    axios({
        url: '/user',
        method: 'put',
        data,
    });
