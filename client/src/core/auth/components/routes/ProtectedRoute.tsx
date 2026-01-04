import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "../../auth.hook";
import LoadingPage from "../../../../shared/page/LoadingPage";

function ProtectedRoute() {
    const { user, loading } = useContextAuth();

    if (loading) return <LoadingPage />;

    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;
