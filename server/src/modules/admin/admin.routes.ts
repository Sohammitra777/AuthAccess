import { Router } from "express";
import adminController from "./admin.controller";
import sharedSchema from "../../shared/shared.schema";
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
    sharedMiddleware.validateBody(sharedSchema.signup),
    adminController.createUser
);

adminRoutes.put(
    "/users/:id",
    sharedMiddleware.requireAuth(),
    sharedMiddleware.requireRole("admin"),
    sharedMiddleware.validateBody(sharedSchema.updateUser),
    adminController.updateUser
);

adminRoutes.delete(
    "/users/:id",
    sharedMiddleware.requireAuth(),
    sharedMiddleware.requireRole("admin"),
    adminController.deleteUser
);

export default adminRoutes;
