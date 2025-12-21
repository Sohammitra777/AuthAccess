import { Router } from "express";
import authController from "./auth.controller";
import sharedSchema from "../../shared/shared.schema";
import sharedMiddleware from "../../shared/shared.middleware";
import authMiddleware from "./auth.middleware";

const authRouter = Router();

authRouter.post(
    "/signup",
    sharedMiddleware.validateBody(sharedSchema.signup),
    authController.signup
);

authRouter.post(
    "/login",
    sharedMiddleware.validateBody(sharedSchema.login),
    authController.login
);

authRouter.get("/me", sharedMiddleware.requireAuth(), authController.me);

authRouter.post("/logout", authController.logout);

authRouter.post(
    "/refresh",
    authMiddleware.validateRefreshToken(),
    authController.refresh
);

export default authRouter;
