import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import utils from "./shared.util";
import authUtils from "../modules/auth/auth.utils";
import { Role } from "../modules/auth/auth.types";

const sharedMiddleware = {
    validateBody: (schema: ZodType) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                return utils.error(res, {
                    message: "validation failed",
                    error: result.error.issues,
                });
            }

            req.body = result.data;
            next();
        };
    },

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

    requireRole: (userRole: Role) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const { role } = req.user;

            if (!role)
                return utils.error(res, { error: "Not authenticated" }, 401);

            if (role !== userRole)
                return utils.error(
                    res,
                    { error: "Forbidden: insufficient role" },
                    403
                );

            next();
        };
    },
};

export default sharedMiddleware;
