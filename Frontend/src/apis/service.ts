import axios from './httpRequest';

export const apiGetServices = () =>
    axios({
        url: '/service',
        method: 'get',
    });
