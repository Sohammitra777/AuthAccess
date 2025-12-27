export type JwtPayload = {
    userId: number;
    userEmail: string;
    userRole: string;
    exp: number;
};

export type User = {
    id: number;
    email: string;
    role: string;
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
