import { Router } from "express";
import adminController from "./admin.controller";
import sharedSchema, { updateUserSchema } from "../../shared/shared.schema";
import sharedMiddleware from "../../shared/shared.middleware";

const adminRoutes = Router();

adminRoutes.get(
    "/users",
    sharedMiddleware.requireAuth(),
    sharedMiddleware.requireRole("admin"),
    adminController.getUsers
);

adminRoutes.post(
    "/users",
    sharedMiddleware.requireAuth(),
    sharedMiddleware.requireRole("admin"),
    sharedMiddleware.validateRequest(sharedSchema.register),
    adminController.createUser
);

adminRoutes.put(
    "/users/:id",
    sharedMiddleware.requireAuth(),
    sharedMiddleware.requireRole("admin"),
    sharedMiddleware.validateRequest(updateUserSchema),
    adminController.updateUser
);

adminRoutes.delete(
    "/users/:id",
    sharedMiddleware.requireAuth(),
    sharedMiddleware.requireRole("admin"),
    adminController.deleteUser
);

export default adminRoutes;
