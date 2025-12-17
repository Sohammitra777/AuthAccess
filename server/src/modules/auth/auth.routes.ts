import { Router } from "express";
import authMiddleware from "../../shared/shared.middleware";
import schema from "../../shared/shared.schema";
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

export default authRouter;
