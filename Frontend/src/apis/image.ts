import axios from './httpRequest';

export const apiGetImage = (pathName) =>
    axios({
        url: `/image/${pathName}`,
        method: 'get',
        withCredentials: true,
    });
