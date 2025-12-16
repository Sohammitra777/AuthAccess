import { Router } from "express";
import authMiddleware from "./auth.middleware";
import schema from "./auth.schema";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post(
    "/signup",
    authMiddleware.validateRequest(schema.register),
    authController.signup
);

authRouter.post(
    "/login",
    authMiddleware.validateRequest(schema.register),
    authController.login
);

authRouter.get("/me", authMiddleware.requireAuth(), authController.me);
authRouter.get(
    "/admin/data",
    authMiddleware.requireAuth(),
    authMiddleware.requireRole("admin")
);

export default authRouter;
