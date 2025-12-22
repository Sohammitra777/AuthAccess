import authRepo from "./auth.repo";
import authUtils from "./auth.utils";
import { ServiceResponse } from "../../shared/shared.type";
import { Data, Refresh } from "./auth.types";

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
                message: "User already exist",
            };

        const createdNewUserData = await authRepo.createNewUser(
            email,
            password
        );

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
                message: "User not registered",
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
                message: "Invalid Password",
            };

        const accessToken = authUtils.createAccessToken(
            user.id,
            user.email,
            user.role
        );

        const refreshToken = authUtils.createRefreshToken();
        const refreshTokenHash = authUtils.hashRefreshToken(refreshToken);
        const expiresAt = authUtils.refreshTokenExpiry();

        await authRepo.createRefreshToken(user.id, refreshTokenHash, expiresAt);
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
                    refreshToken,
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
                message: "User not found",
            };

        return {
            success: true,
            status: 200,
            message: "user validated",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    },

    logout: async (refreshToken: string): Promise<void> => {
        const tokenHash = authUtils.hashRefreshToken(refreshToken);
        await authRepo.deleteRefreshToken(tokenHash);
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
            await authRepo.deleteRefreshToken(token.id);
            return {
                success: false,
                status: 401,
                message: "Refresh token expired",
            };
        }

        // 🔁 ROTATION
        await authRepo.deleteRefreshToken(token.id);

        const newRefreshToken = authUtils.createRefreshToken();
        const newRefreshTokenHash = authUtils.hashRefreshToken(newRefreshToken);

        const refreshTokenExpiresAt = authUtils.refreshTokenExpiry();

        await authRepo.createRefreshToken(
            token.userId,
            newRefreshTokenHash,
            refreshTokenExpiresAt
        );

        const user = await authRepo.getUserById(token.userId);

        if (!user) {
            return {
                success: false,
                status: 401,
                message: "User not found",
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
            message: "user refreshed",
            data: {
                accessToken,
                newRefreshToken,
            },
        };
    },
};

export default authServices;
