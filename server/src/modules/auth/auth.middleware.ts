import { NextFunction, Request, Response } from "express";
import { util, ZodType } from "zod";
import utils from "../../shared/util";
import authUtils from "./auth.utils";
import { Role } from "./auth.type";

const authMiddleware = {
    validateRequest: (schema: ZodType) => {
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
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return utils.error(res, { error: "No token provided" }, 401);
            }

            try {
                const realToken = authHeader.split(" ")[1];
                const tokenValue = authUtils.verifyToken(realToken) as {
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
                utils.error(res, { error: "Invalid or expired token" }, 401);
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

export default authMiddleware;
