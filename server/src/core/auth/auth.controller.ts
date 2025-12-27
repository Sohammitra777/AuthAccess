import { Request, Response } from "express";
import authServices from "./auth.services";
import env from "../config/env";
import authResponse from "./auth.responses";
import utils from "../../shared/shared.util";

const authController = {
    signup: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = await authServices.signup(email, password);
        if (!result.success)
            return authResponse.error(
                res,
                { error: result.message },
                result.status
            );

        authResponse.success(
            res,
            { message: result.message, user: result.data },
            result.status
        );
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result = await authServices.login(email, password);

        if (!result.success)
            return authResponse.error(
                res,
                { error: result.message },
                result.status
            );

        const user = result.data;
        if (!user)
            return authResponse.error(res, { error: "Login failed" }, 500);

        const { id, role, token } = user;
        const refreshToken = token.refreshToken;
        utils.attachCookie(
            res,
            "accessToken",
            token.accessToken,
            env.ACCESS_TOKEN_AGE
        );
        utils.attachCookie(
            res,
            "refreshToken",
            refreshToken,
            env.REFRESH_TOKEN_AGE
        );
        authResponse.success(
            res,
            { message: result.message, user: { id, email: user.email, role } },
            result.status
        );
    },

    me: async (req: Request, res: Response) => {
        const { email } = req.user;

        const result = await authServices.me(email);
        if (!result.success)
            return authResponse.error(
                res,
                { error: result.message },
                result.status
            );

        authResponse.success(
            res,
            { message: result.message, user: result.data },
            result.status
        );
    },

    logout: async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await authServices.logout(refreshToken);
        }

        utils.removeCookie(res, "accessToken");
        utils.removeCookie(res, "refreshToken");
        res.sendStatus(204);
    },

    refresh: async (req: Request, res: Response) => {
        const refreshToken = req.refreshToken;

        const result = await authServices.refresh(refreshToken);

        if (!result.success) {
            utils.removeCookie(res, "refreshToken");
            return authResponse.error(
                res,
                { error: result.message },
                result.status
            );
        }

        const { accessToken, newRefreshToken } = result.data;
        utils.attachCookie(
            res,
            "accessToken",
            accessToken,
            env.ACCESS_TOKEN_AGE
        );
        utils.attachCookie(
            res,
            "refreshToken",
            newRefreshToken,
            env.REFRESH_TOKEN_AGE
        );
        res.sendStatus(204);
    },
};

export default authController;
