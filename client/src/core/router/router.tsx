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
                        element: <routes.PrivateNavbar />,
                    },
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
                            {
                                path: "/admin/users",
                                element: <routes.CreateUserPage />,
                            },
                            {
                                path: "/admin/admins",
                                element: <routes.CreateAdminPage />,
                            },
                        ],
                    },
                ],
            },
            { path: "*", element: <routes.NotFoundPage /> },
        ],
    },
]);

export default router;
