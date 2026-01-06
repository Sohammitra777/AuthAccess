import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "../../auth.hook";

function PublicRoute() {
    const { user } = useContextAuth();

    if (user) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
}

export default PublicRoute;
