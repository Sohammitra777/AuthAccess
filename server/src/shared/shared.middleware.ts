import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import utils from "./shared.util";

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
};

export default sharedMiddleware;
