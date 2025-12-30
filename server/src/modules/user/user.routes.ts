import { Router } from "express";
import userController from "./user.controller";

const userRoutes = Router();

userRoutes.post("/seed", userController.seedData);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
