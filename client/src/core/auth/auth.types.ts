export type User = {
    id: string;
    email: string;
    role: string;
};

export type ApiSuccess = {
    success: true;
    message: string;
    user: User;
};

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User | void>;
    logout: () => Promise<void>;
};

export type LoginSchmema = {
    email: string;
    password: string;
};

export type ApiError = {
    success: false;
    status: number;
    message: string;
};

export type Response = {
    message: string;
    user: User;
};
