import utils from "../../shared/shared.util";
import { Role } from "../../core/auth/auth.types";
import { Request, Response, NextFunction } from "express";

const adminMiddleware = {
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

export default adminMiddleware;
