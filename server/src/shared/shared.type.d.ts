import * as express from "express";

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: number;
                email: string;
                role: string;
            };

            refreshToken: string;
        }
    }
}

type ServiceResponseSuccess<RS> = {
    success: true;
    status: number;
    message: string;
    data: RS;
};

type ServiceResponseFailure = {
    success: false;
    status: number;
    message: string;
};

export type ServiceResponse<R> = ServiceResponseSuccess<R> | ServiceResponseFailure;

type UserRepoResponse = {
    id: string;
    hash: string;
    email: string;
    role: string;
};

type RefreshTokenRepoResponse = {
    id: string;
    userId: string;
    tokenHash: string;
    createdAt: Date;
    expiresAt: Date;
    revokedAt: Date | null;
};
