import { Response } from "express";
import env from "../config/env";


const utils = {
    success: <T>(res: Response, payload: T, status: number = 200) => {
        res.status(status).json({
            success: true,
            ...payload,
        });
    },

    error: <T>(res: Response, payload: T, status: number = 400) => {
        return res.status(status).json({
            success: false,
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
            maxAge: Number(age),
        });
    },

    removeCookie: (
        res: Response,
        tokenName: "accessToken" | "refreshToken"
    ) => {
        res.clearCookie(tokenName, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });
    },
};

export default utils;
