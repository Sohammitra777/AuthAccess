import { Response } from "express";
import env from "../config/env";

const utils = {
    success: (res: Response, payload: object, status: number = 200) => {
        res.status(status).json({
            success: true,
            ...payload,
        });
    },

    attachCookie: (
        res: Response,
        tokenName: "accessToken" | "refreshToken",
        token: string,
        age: number
    ) => {
        res.cookie(tokenName, token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: age,
        });
    },

    error: (res: Response, payload: object, status: number = 400) => {
        return res.status(status).json({
            success: false,
            ...payload,
        });
    },
};

export default utils;
