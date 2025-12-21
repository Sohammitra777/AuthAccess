import { Request, Response } from "express";
import authServices from "./auth.services";
import utils from "../../shared/shared.util";
import env from "../../config/env";

const authController = {
    signup: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = await authServices.signup(email, password);
        if (!result.success)
            return utils.error(res, { message: result.message }, result.status);

        utils.success(
            res,
            { message: result.message, user: result.data },
            result.status
        );
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result = await authServices.login(email, password);

        if (!result.success)
            return utils.error(res, { message: result.message }, result.status);

        const user = result.data;

        if (!user) return utils.error(res, { message: "Login failed" }, 500);

        const token = authServices.createAccessTokenFromController(
            result.data!
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 1000 * 60 * 15,
        });
        utils.success(
            res,
            { message: result.message, user: result.data },
            result.status
        );
    },

    me: async (req: Request, res: Response) => {
        const { email } = req.user;

        const result = await authServices.me(email);
        if (!result.success)
            return utils.error(res, { error: result.message }, result.status);

        utils.success(
            res,
            { message: result.message, user: result.data },
            result.status
        );
    },

    logout: async (req: Request, res: Response) => {
        res.clearCookie("accessToken", {
            path: "/",
        });

        return res.sendStatus(204);
    },
};

export default authController;
