import { Request, Response } from "express";
import authServices from "./auth.services";
import utils from "../../shared/util";

const authController = {
    signup: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = await authServices.signup(email, password);
        if (!result.success)
            return utils.error(res, { message: result.message }, result.status);

        return utils.success(
            res,
            { message: result.message, user: result.data },
            result.status
        );
    },
};

export default authController;
