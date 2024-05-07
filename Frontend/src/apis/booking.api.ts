import axios from './axiosConfig';

export const apiBooking = (data: CustomerBooking): Promise<Res> =>
    axios({
        url: '/booking',
        method: 'post',
        data,
    });
export const apiGetMyBookings = (): Promise<Res> =>
    axios({
        url: '/booking',
        method: 'get',
    });
export const apiGetBooking = (bookingId: string): Promise<Res> =>
    axios({
        url: `/booking/${bookingId}`,
        method: 'get',
    });
