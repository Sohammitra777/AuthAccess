export type JwtPayload = {
    userId: number;
    userEmail: string;
    userRole: string;
};

export type User = {
    userId: number;
    email: string;
    role: string;
};

export type AuthContextType = {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
};
