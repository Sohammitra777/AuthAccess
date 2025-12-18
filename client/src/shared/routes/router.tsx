import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { AdminPanelPage, DashboardPage, LoginPage, SignupPage } from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/admin",
                element: <AdminPanelPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
        ],
    },
]);

export default router;
