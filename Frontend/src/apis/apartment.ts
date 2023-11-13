import axios from './httpRequest';

export const apiCreateApartment = (data: any) =>
    axios({
        url: '/apartment',
        method: 'post',
        data,
        withCredentials: true,
    });
