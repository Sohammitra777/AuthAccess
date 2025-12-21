import { email } from "zod";
import authRepo from "./auth.repo";
import authUtils from "./auth.utils";
import type { Refresh } from "./auth.types";

const authServices = {
    signup: async (email: string, password: string) => {
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
            data: createdNewUserData[0],
        };
    },

    login: async (email: string, password: string) => {
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

        return {
            success: true,
            status: 200,
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    },

    me: async (email: string) => {
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
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    },

    createAccessTokenFromController: (user: {
        id: number;
        email: string;
        role: string;
    }) => {
        return authUtils.createAccessToken(user.id, user.email, user.role);
    },

    createAndStoreRefreshToken: async (userId: number) => {
        const refreshToken = authUtils.generateRefreshToken();
        const refreshTokenHash = await authUtils.hashRefreshToken(refreshToken);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await authRepo.createRefreshToken(userId, refreshTokenHash, expiresAt);

        return refreshToken;
    },

    refresh: async (incommingRefreshToken: string): Refresh => {
        //o(n) lookup can be improved to o(1) via redis + session setup
        const storedTokens = await authRepo.getAllRefreshToken();

        for (const token of storedTokens) {
            const isValid = await authUtils.verifyRefreshToken(
                token.tokenHash,
                incommingRefreshToken
            );

            if (!isValid) continue;
            if (token.expiresAt < new Date()) {
                await authRepo.deleteRefreshToken(token.id);
                return {
                    success: false,
                    status: 401,
                    message: "Refresh token expired",
                };
            }

            await authRepo.deleteRefreshToken(token.id);

            const newRefreshToken = authUtils.generateRefreshToken();
            const newHashedRefreshToken = await authUtils.hashRefreshToken(
                newRefreshToken
            );

            const refreshTokenExpiresAt = new Date();
            refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

            await authRepo.createRefreshToken(
                token.userId,
                newHashedRefreshToken,
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
                data: {
                    accessToken,
                    newRefreshToken,
                    accessAge: 1000 * 60 * 15,
                    refreshAge: 1000 * 60 * 60 * 24 * 7,
                },
            };
        }

        return {
            success: false,
            status: 401,
            message: "Invalid Refresh Token",
        };
    },
};

export default authServices;
