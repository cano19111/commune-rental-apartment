import axios from './httpRequest';

export const apiCreateApartment = (data: FormData): Promise<Res> =>
    axios({
        url: '/apartment',
        method: 'post',
        data,
    });
export const apiSearchRoom = (params: string): Promise<Res> =>
    axios({
        url: `/apartment/search?${params}`,
        method: 'get',
    });
export const apiApartmentDetail = (apartmentId: string, params: string): Promise<Res> =>
    axios({
        url: `/apartment/${apartmentId}?${params}`,
        method: 'get',
    });
