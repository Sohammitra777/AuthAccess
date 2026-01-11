import { Response } from "express";
import env from "../core/config/env";

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
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: Number(age),
            partitioned: true,
        });
    },

    removeCookie: (
        res: Response,
        tokenName: "accessToken" | "refreshToken"
    ) => {
        res.clearCookie(tokenName, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            partitioned: true,
        });
    },
};

export default utils;
