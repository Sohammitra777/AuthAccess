import { NextFunction, Request, Response } from "express";
import utils from "../../shared/shared.util";

const authMiddleware = {
    validateRefreshToken: () => {
        return (req: Request, res: Response, next: NextFunction) => {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken)
                return utils.error(res, { message: "No refresh Token" }, 401);

            req.refreshToken = refreshToken;
            next();
        };
    },
};

export default authMiddleware;
