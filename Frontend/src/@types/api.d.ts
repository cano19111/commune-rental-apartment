interface Res<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}
