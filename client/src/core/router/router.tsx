import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import PublicRoute from "../auth/routes/PublicRoute";
import ProtectedRoute from "../auth/routes/ProtectedRoute";
import HomePage from "../../feature/Home/pages/HomePage";
import DashboardPage from "../../feature/dashboard/pages/DashboardPage";
import LoginPage from "../auth/pages/LoginPage";
import AdminPage from "../../feature/admin/pages/AdminPage";
import RoleProtectedRoute from "../auth/routes/RoleProtectedRoute";
import SignupPage from "../auth/pages/SignupPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/signup",
                        element: <SignupPage />,
                    },
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        element: <RoleProtectedRoute role="admin" />,
                        children: [
                            {
                                path: "/admin",
                                element: <AdminPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
