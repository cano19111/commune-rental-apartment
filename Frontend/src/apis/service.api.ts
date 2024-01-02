import axios from './axiosConfig';

export const apiGetServices = (): Promise<Res> =>
    axios({
        url: '/service',
        method: 'get',
    });
