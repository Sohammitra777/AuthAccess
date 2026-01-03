import { createBrowserRouter } from "react-router-dom";
import routes, { authRoutes } from "../core";
import PrivateNavbar from "../../shared/components/PrivateNavbar";
import CreateUserPage from "../../feature/admin/pages/CreateUsersPage";
import CreateAdminPage from "../../feature/admin/pages/CreateAdminPage";

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
            element: <PrivateNavbar />,
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
                element: <CreateUserPage />,
              },
              {
                path: "/admin/admins",
                element: <CreateAdminPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
