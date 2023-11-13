import { createContext, Dispatch, FC, useEffect, useReducer } from 'react';
import { AuthState } from './types';
import { initialize, reducer, signIn } from './reduces';
import { apiGetCurrentUser } from '@/apis';

interface AuthProviderProps {
    children: React.ReactNode;
}

export enum AuthActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
}

export interface PayloadAction<T> {
    type: AuthActionType;
    payload: T;
}
export interface AuthContextType extends AuthState {
    dispatch: Dispatch<PayloadAction<AuthContextType>>;
}
const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    user: null,
};

export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        (async () => {
            const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
            if (!accessToken) {
                return dispatch(initialize({ isAuthenticated: false, accessToken: null, user: null }));
            } else dispatch(initialize({ isAuthenticated: true, accessToken, user: null }));
            try {
                const response = await apiGetCurrentUser();
                if (response.success) dispatch(signIn({ accessToken, user: response?.data.user }));
                else dispatch(initialize({ isAuthenticated: false, accessToken: null, user: null }));
            } catch {
                dispatch(initialize({ isAuthenticated: false, accessToken: null, user: null }));
            }
        })();
    }, []);
    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
