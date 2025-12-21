import argon2 from "argon2";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { StringValue } from "ms";
import crypto from "crypto";

const authUtils = {
    hashPassword: async (password: string) => {
        return await argon2.hash(password);
    },

    verifyPassword: async (userPassword: string, incommingPassword: string) => {
        return await argon2.verify(userPassword, incommingPassword);
    },

    createAccessToken: (
        userId: number,
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

    generateRefreshToken: () => {
        const bytes = new Uint8Array(64);
        crypto.getRandomValues(bytes);

        return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
            ""
        );
    },

    hashRefreshToken: async (token: string) => {
        return await argon2.hash(token);
    },

    verifyRefreshToken: async (hash: string, token: string) => {
        return await argon2.verify(hash, token);
    },
};

export default authUtils;
