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

        utils.success(res, { user: result.data }, result.status);
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
};

export default authController;
