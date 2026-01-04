import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "../../auth.hook";
import LoadingPage from "../../../../shared/page/LoadingPage";

function PublicRoute() {
    const { user, loading } = useContextAuth();

    if (loading) return <LoadingPage />;
    
    if (user) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
}

export default PublicRoute;
