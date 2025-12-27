import { NextFunction, Request, Response } from "express";
import utils from "../../shared/shared.util";
import authUtils from "./auth.utils";

const authMiddleware = {
    requireAuth: () => {
        return (req: Request, res: Response, next: NextFunction) => {
            const token = req.cookies.accessToken;

            if (!token) {
                return utils.error(res, { error: "Not authenticated" }, 401);
            }

            try {
                const tokenValue = authUtils.verifyAccessToken(token) as {
                    userId: number;
                    userEmail: string;
                    userRole: string;
                };

                req.user = {
                    id: tokenValue.userId,
                    email: tokenValue.userEmail,
                    role: tokenValue.userRole,
                };

                next();
            } catch (error) {
                return utils.error(
                    res,
                    { error: "Invalid or expired token" },
                    401
                );
            }
        };
    },
    
    validateRefreshToken: () => {
        return (req: Request, res: Response, next: NextFunction) => {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken)
                return utils.error(res, { message: "No Refresh Token" }, 401);

            req.refreshToken = refreshToken;
            next();
        };
    },
};

export default authMiddleware;
