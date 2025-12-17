import { Router } from "express";
import adminController from "./admin.controller";
import authMiddleware from "../../shared/shared.middleware";
import authSchema from "../../shared/shared.schema";

const adminRoutes = Router();

adminRoutes.get(
    "/users",
    authMiddleware.requireAuth(),
    authMiddleware.requireRole("admin"),
    adminController.getUsers
);

adminRoutes.post(
    "/users",
    authMiddleware.requireAuth(),
    authMiddleware.requireRole("admin"),
    authMiddleware.validateRequest(authSchema.register),
    adminController.createUser
);

export default adminRoutes;
