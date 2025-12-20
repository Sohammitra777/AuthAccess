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
    login: (token: string) => void;
    logout: () => void;
};
