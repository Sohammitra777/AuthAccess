import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import crypto from "crypto";
import env from "../config/env";

const authUtils = {
    hashPassword: async (password: string) => {
        return await argon2.hash(password);
    },

    verifyPassword: async (userPassword: string, incommingPassword: string) => {
        return await argon2.verify(userPassword, incommingPassword);
    },

    createAccessToken: (
        userId: string,
        userEmail: string,
        userRole: string
    ) => {
        return jwt.sign(
            { userId, userEmail, userRole },
            env.JWT_ACCESS_SECRET,
            { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as StringValue }
        );
    },

    verifyAccessToken: (token: string) => {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    },

    createRefreshToken: () => {
        return crypto.randomBytes(64).toString("hex");
    },

    hashRefreshToken: (token: string) => {
        return crypto
            .createHmac("sha256", env.JWT_REFRESH_SECRET)
            .update(token)
            .digest("hex");
    },

    refreshTokenExpiry: () => {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        return expiresAt;
    },
};

export default authUtils;
