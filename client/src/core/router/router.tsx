import { createBrowserRouter } from "react-router-dom";
import routes, { authRoutes } from "../core";

const router = createBrowserRouter([
    {
        path: "/",
        element: <routes.App />,
        children: [
            {
                element: <authRoutes.PublicRoute />,
                children: [
                    {
                        path: "/",
                        element: <routes.HomePage />,
                    },
                    {
                        path: "/signup",
                        element: <routes.SignupPage />,
                    },
                    {
                        path: "/login",
                        element: <routes.LoginPage />,
                    },
                ],
            },
            {
                element: <authRoutes.ProtectedRoute />,
                children: [
                    {
                        path: "/dashboard",
                        element: <routes.DashboardPage />,
                    },
                    {
                        element: <authRoutes.RoleProtectedRoute role="admin" />,
                        children: [
                            {
                                path: "/admin",
                                element: <routes.AdminPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
