import axios from './httpRequest';

export const apiBooking = (data: CustomerBooking): Promise<Res> =>
    axios({
        url: '/booking',
        method: 'post',
        data,
    });
