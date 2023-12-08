import React, { createContext, Dispatch, FC, useEffect, useReducer } from 'react';
import { AuthState } from './types';
import { initialize, reducer } from './reduces';
import { apiGetCurrentUser } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

interface AuthProviderProps {
    children: React.ReactNode;
}

export enum AuthActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
}

// Corrected PayloadAction type
export interface PayloadAction<T> {
    type: AuthActionType;
    payload?: T;
    dispatch?: Dispatch<PayloadAction<AuthState>>;
}

export interface AuthContextType extends AuthState {
    dispatch: Dispatch<PayloadAction<AuthState>>;
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

    const {
        data: currentUser,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: apiGetCurrentUser,
        enabled: !!localStorage.getItem('ACCESS_TOKEN'),
    });

    useEffect(() => {
        if (!currentUser && !isLoading) {
            dispatch(initialize({ isAuthenticated: false, accessToken: null, user: null }));
        } else if (currentUser && !isError && !!localStorage.getItem('ACCESS_TOKEN')) {
            const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
            dispatch(initialize({ isAuthenticated: true, accessToken: token, user: currentUser?.data?.user }));
        }
    }, [currentUser, isError, isLoading, state.accessToken]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            <Spin spinning={isLoading} fullscreen={isLoading} size="large">
                {children}
            </Spin>
        </AuthContext.Provider>
    );
};
