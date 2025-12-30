import authRouter from "../core/auth/auth.routes";
import adminRoutes from "./admin/admin.routes";
import userRoutes from "./user/user.routes";

const routes = {
    authRouter,
    userRoutes,
    adminRoutes,
};

export default routes;
