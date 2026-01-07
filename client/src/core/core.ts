import PublicRoute from "./auth/components/routes/PublicRoute";
import ProtectedRoute from "./auth/components/routes/ProtectedRoute";
import RoleProtectedRoute from "./auth/components/routes/RoleProtectedRoute";

import LoginPage from "./auth/components/pages/LoginPage";
import SignupPage from "./auth/components/pages/SignupPage";

import HomePage from "../feature/Home/pages/HomePage";
import AdminPage from "../feature/admin/pages/AdminPage";
import DashboardPage from "../feature/dashboard/pages/DashboardPage";

import CreateUserPage from "../feature/admin/pages/CreateUsersPage";
import CreateAdminPage from "../feature/admin/pages/CreateAdminPage";
import PrivateNavbar from "../shared/components/navbar/PrivateNavbar";
import App from "../App";
import NotFoundPage from "../shared/page/NotFoundPage";

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
    PrivateNavbar,
    CreateUserPage,
    CreateAdminPage,
    NotFoundPage,
};

export default routes;
