import axios from './httpRequest';

export const apiCreateApartment = (data: any) =>
    axios({
        url: '/apartment',
        method: 'post',
        data,
        withCredentials: true,
    });
export const apiSearchRoom = (params: string) =>
    axios({
        url: `/apartment/search?${params}`,
        method: 'get',
        withCredentials: true,
    });
