import axios from './httpRequest';

export const apiRegister = (data: ReqSignUp): Promise<Res> =>
    axios({
        url: '/auth/register',
        method: 'post',
        data,
    });

export const apiLogin = (data: ReqSignIn): Promise<Res> =>
    axios({
        url: '/auth/login',
        method: 'post',
        data,
    });
