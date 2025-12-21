import argon2 from "argon2";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { StringValue } from "ms";

const authUtils = {
    hashPassword: async (password: string) => {
        return await argon2.hash(password);
    },

    verifyPassword: async (userPassword: string, incommingPassword: string) => {
        return await argon2.verify(userPassword, incommingPassword);
    },

    createAccessToken: (userId: number, userEmail: string, userRole: string) => {
        return jwt.sign(
            { userId, userEmail, userRole },
            env.JWT_ACCESS_SECRET,
            { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as StringValue }
        );
    },

    verifyAccessToken: (token: string) => {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    },
};

export default authUtils;
