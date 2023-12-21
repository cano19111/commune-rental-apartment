interface ReqSignIn {
    email: string;
    password: string;
}
interface ReqSignUp {
    email: string;
}
interface AuthState {
    isAuthenticated?: boolean;
    accessToken?: string | null;
    user?: UserType | null;
}
interface EditUser {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    nationality: string;
    gender: string;
    address: string;
    personalId: string;
}

interface UserType {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    avatar: string;
    dateOfBirth: Date;
    nationality: string;
    gender: string;
    address: string;
    personalId: string;
}

interface CustomerBooking {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    arrivalTime: string;
}
