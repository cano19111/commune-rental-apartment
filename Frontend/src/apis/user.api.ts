import axios from './httpRequest';

export const apiGetCurrentUser = (): Promise<Res> =>
    axios({
        url: '/user/current-user',
        method: 'get',
    });
export const apiEditUser = (data: FormData): Promise<Res> =>
    axios({
        url: '/user',
        method: 'put',
        data,
    });
