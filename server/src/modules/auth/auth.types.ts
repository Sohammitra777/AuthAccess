

export type Role = "user" | "admin";

export type Data = {
    id: number;
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
