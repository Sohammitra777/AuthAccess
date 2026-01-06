import authRepo from "./auth.repo";
import authUtils from "./auth.utils";
import { ServiceResponse } from "../../shared/shared.type";
import { Data, Refresh } from "./auth.types";
import authRepoTransaction from "./auth.repo.transaction";

const authServices = {
    signup: async (
        email: string,
        password: string
    ): Promise<ServiceResponse<Omit<Data, "token">>> => {
        const result = await authRepo.checkUserExist(email);

        if (result.length > 0)
            return {
                success: false,
                status: 409,
                message: "Unable to Create Account",
            };

        const hash = await authUtils.hashPassword(password);
        const createdNewUserData = await authRepo.createNewUser(email, hash);

        return {
            success: true,
            status: 201,
            message: "signup successful",
            data: createdNewUserData,
        };
    },

    login: async (
        email: string,
        password: string
    ): Promise<ServiceResponse<Data>> => {
        const result = await authRepo.checkUserExist(email);
        const user = result[0];

        if (!user) {
            return {
                success: false,
                status: 400,
                message: "Invalid credentials",
            };
        }

        const verifyPassword = await authUtils.verifyPassword(
            user.hash,
            password
        );

        if (!verifyPassword)
            return {
                success: false,
                status: 400,
                message: "Invalid credentials",
            };

        const accessToken = authUtils.createAccessToken(
            user.id,
            user.email,
            user.role
        );

        const refreshTokenVal = authUtils.createRefreshToken();
        const refreshTokenHash = authUtils.hashRefreshToken(refreshTokenVal);
        const expiresAt = authUtils.refreshTokenExpiry();

        await authRepoTransaction.replaceUserRefreshTokenForLogin(
            refreshTokenHash,
            user.id,
            expiresAt
        );
        return {
            success: true,
            status: 200,
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                token: {
                    accessToken,
                    refreshToken: refreshTokenVal,
                },
            },
        };
    },

    me: async (
        email: string
    ): Promise<ServiceResponse<Omit<Data, "token">>> => {
        const result = await authRepo.checkUserExist(email);
        const user = result[0];

        if (!user)
            return {
                success: false,
                status: 404,
                message: "Credentials not found",
            };

        return {
            success: true,
            status: 200,
            message: "Credentials validated",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    },

    logout: async (refreshToken: string): Promise<void> => {
        const tokenHash = authUtils.hashRefreshToken(refreshToken);
        await authRepo.deleteRefreshTokenByHash(tokenHash);
    },

    refresh: async (
        incomingRefreshToken: string
    ): Promise<ServiceResponse<Refresh>> => {
        const refreshTokenHash =
            authUtils.hashRefreshToken(incomingRefreshToken);

        const token = await authRepo.getRefreshTokenByHash(refreshTokenHash);

        if (!token) {
            return {
                success: false,
                status: 401,
                message: "Invalid refresh token",
            };
        }

        if (token.expiresAt < new Date()) {
            await authRepo.deleteRefreshTokenByHash(token.id);
            return {
                success: false,
                status: 401,
                message: "Refresh token expired",
            };
        }

        //  ROTATION
        const result = await authRepoTransaction.rotateRefreshToken(token);
        const user = await authRepo.getUserById(token.userId);

        if (!user) {
            return {
                success: false,
                status: 401,
                message: "Credentials not found",
            };
        }

        const accessToken = authUtils.createAccessToken(
            user.id,
            user.email,
            user.role
        );

        return {
            success: true,
            status: 200,
            message: "Credentials refreshed",
            data: {
                accessToken,
                newRefreshToken: result.newRefreshToken,
            },
        };
    },
};

export default authServices;
