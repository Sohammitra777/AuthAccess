

export type Role = "user" | "admin";

type RefreshSuccess = {
    success: true;
    data: {
        accessToken: string;
        newRefreshToken: string;
        accessAge: number;
        refreshAge: number;
    };
};

type RefreshFailure = {
    success: false;
    status: number;
    message: string;
};

export type Refresh = Promise<RefreshSuccess | RefreshFailure>;
