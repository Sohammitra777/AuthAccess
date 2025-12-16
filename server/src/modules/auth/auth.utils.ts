import "dotenv/config";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET!;

const authUtils = {
    hashPassword: async (password: string) => {
        return await argon2.hash(password);
    },

    verifyPassword: async (userPassword: string, incommingPassword: string) => {
        return await argon2.verify(userPassword, incommingPassword);
    },

    signinToken: (userId: number, userEmail: string, userRole: string) => {
        return jwt.sign({userId, userEmail, userRole }, jwt_secret, {
            expiresIn: "1h",
        });
    },

    verifyToken: (token: string) => {
        return jwt.verify(token, jwt_secret);
    },
};

export default authUtils;
