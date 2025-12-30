export type Role = "user" | "admin";

export type Data = {
    id: string;
    email: string;
    role: string;
    token: {
        accessToken: string;
        refreshToken: string;
    };
};

export type Refresh = {
    accessToken: string;
    newRefreshToken: string;
};

export type AuthFailureResponse = {
    error: string;
};

export type AuthSuccessResponse = {
    message: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
};