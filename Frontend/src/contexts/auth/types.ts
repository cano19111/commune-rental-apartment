export interface AuthState {
    isAuthenticated?: boolean;
    accessToken?: string | null;
    user?: object | null;
}
