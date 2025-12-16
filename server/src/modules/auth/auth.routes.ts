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

export default authRouter;
