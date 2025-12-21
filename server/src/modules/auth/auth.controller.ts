import { Request, Response } from "express";
import authServices from "./auth.services";
import utils from "../../shared/shared.util";

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

        const accessToken = authServices.createAccessTokenFromController(user);
        const refreshToken = await authServices.createAndStoreRefreshToken(
            user.id
        );

        utils.attachCookie(res, "accessToken", accessToken, 1000 * 60 * 15);
        utils.attachCookie(
            res,
            "refreshToken",
            refreshToken,
            1000 * 60 * 60 * 24 * 7
        );
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

        res.clearCookie("refreshToken", {
            path: "/",
        });

        return res.sendStatus(204);
    },

    refresh: async (req: Request, res: Response) => {
        const refreshToken = req.refreshToken;

        const result = await authServices.refresh(refreshToken);

        if (!result.success)
            return utils.error(res, { message: result.message }, result.status);

        const { accessToken, newRefreshToken, accessAge, refreshAge } =
            result.data;
        utils.attachCookie(res, "accessToken", accessToken, accessAge);
        utils.attachCookie(res, "refreshToken", newRefreshToken, refreshAge);
        return res.sendStatus(204);
    },
};

export default authController;
