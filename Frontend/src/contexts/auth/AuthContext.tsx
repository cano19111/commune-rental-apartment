import React, { createContext, Dispatch, FC, useEffect, useReducer, useState } from 'react';
import { AuthActionType } from './types';
import { initialize, reducer } from './reduces';
import { apiGetCurrentUser } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

interface AuthProviderProps {
    children: React.ReactNode;
}

export interface PayloadAction<T> {
    type: AuthActionType;
    payload?: T;
    dispatch?: Dispatch<PayloadAction<AuthState>>;
}

export interface AuthContextType extends AuthState {
    dispatch: Dispatch<PayloadAction<AuthState>>;
    authModel: { isOpen: boolean; activeTab: string };
    setAuthModel: Dispatch<React.SetStateAction<{ isOpen: boolean; activeTab: string }>>;
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    user: null,
};

export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
    authModel: { isOpen: false, activeTab: 'signin' },
    setAuthModel: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [authModel, setAuthModel] = useState<{ isOpen: boolean; activeTab: string }>({
        isOpen: false,
        activeTab: 'signin',
    });
    const { data, isError, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: apiGetCurrentUser,
        enabled: !!localStorage.getItem('ACCESS_TOKEN'),
    });

    useEffect(() => {
        if (!data && !data?.success && !isLoading) {
            dispatch(initialize({ isAuthenticated: false, accessToken: null, user: null }));
        } else if (data && !isError && !!localStorage.getItem('ACCESS_TOKEN')) {
            const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
            dispatch(initialize({ isAuthenticated: true, accessToken: token, user: data?.data?.user }));
        }
    }, [data, isError, isLoading, state.accessToken]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, authModel, setAuthModel }}>
            <Spin spinning={isLoading} fullscreen={isLoading} size="large">
                {children}
            </Spin>
        </AuthContext.Provider>
    );
};
