import { Router } from "express";
import adminController from "./admin.controller";
import sharedSchema from "../../shared/shared.schema";
import sharedMiddleware from "../../shared/shared.middleware";
import adminMiddleware from "./admin.middleware";
import authMiddleware from "../../core/auth/auth.middleware";

const adminRoutes = Router();

adminRoutes.get(
    "/users",
    authMiddleware.requireAuth(),
    adminMiddleware.requireRole("admin"),
    adminController.getUsers
);

adminRoutes.post(
    "/users",
    authMiddleware.requireAuth(),
    adminMiddleware.requireRole("admin"),
    sharedMiddleware.validateBody(sharedSchema.signup),
    adminController.createUser
);

adminRoutes.put(
    "/users/:id",
    authMiddleware.requireAuth(),
    adminMiddleware.requireRole("admin"),
    sharedMiddleware.validateBody(sharedSchema.updateUser),
    adminController.updateUser
);

adminRoutes.delete(
    "/users/:id",
    authMiddleware.requireAuth(),
    adminMiddleware.requireRole("admin"),
    adminController.deleteUser
);

export default adminRoutes;
