import axios from './axiosConfig';

export const apiSignUp = (data: ReqSignUp): Promise<Res> =>
    axios({
        url: '/auth/register',
        method: 'post',
        data,
    });
export const apiSetPassword = (data: { userId: string; password: string }): Promise<Res> =>
    axios({
        url: '/auth/set-password',
        method: 'post',
        data,
    });
export const apiLogin = (data: ReqSignIn): Promise<Res> =>
    axios({
        url: '/auth/login',
        method: 'post',
        data,
    });
export const apiLoginGoogleSuccess = (data: { userId: string }): Promise<Res> =>
    axios({
        url: `/auth/signin-success/${data.userId}`,
        method: 'get',
    });
