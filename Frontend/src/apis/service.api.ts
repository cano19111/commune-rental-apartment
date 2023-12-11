import axios from './httpRequest';

export const apiGetServices = (): Promise<Res> =>
    axios({
        url: '/service',
        method: 'get',
    });
