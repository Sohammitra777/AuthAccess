import PublicRoute from "./auth/components/routes/PublicRoute";
import ProtectedRoute from "./auth/components/routes/ProtectedRoute";
import RoleProtectedRoute from "./auth/components/routes/RoleProtectedRoute";

import LoginPage from "./auth/components/pages/LoginPage";
import SignupPage from "./auth/components/pages/SignupPage";

import HomePage from "../feature/Home/pages/HomePage";
import AdminPage from "../feature/admin/pages/AdminPage";
import DashboardPage from "../feature/dashboard/pages/DashboardPage";
import App from "../App";

export const authRoutes = {
    PublicRoute,
    ProtectedRoute,
    RoleProtectedRoute,
};

const routes = {
    App,
    DashboardPage,
    LoginPage,
    SignupPage,
    HomePage,
    AdminPage,
};

export default routes;
