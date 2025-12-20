import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import PublicRoute from "../auth/routes/PublicRoute";
import ProtectedRoute from "../auth/routes/ProtectedRoute";
import HomePage from "../../feature/Home/pages/HomePage";

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
                ],
            },
            {
                element: <ProtectedRoute />,
            },
        ],
    },
]);

export default router;
