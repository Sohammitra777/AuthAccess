import { Router } from "express";
import authController from "./auth.controller";
import sharedSchema from "../../shared/shared.schema";
import sharedMiddleware from "../../shared/shared.middleware";

const authRouter = Router();

authRouter.post(
    "/signup",
    sharedMiddleware.validateRequest(sharedSchema.register),
    authController.signup
);

authRouter.post(
    "/login",
    sharedMiddleware.validateRequest(sharedSchema.register),
    authController.login
);

authRouter.get("/me", sharedMiddleware.requireAuth(), authController.me);

export default authRouter;
