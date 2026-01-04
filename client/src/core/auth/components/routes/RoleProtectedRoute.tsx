import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "../../auth.hook";
import LoadingPage from "../../../../shared/page/LoadingPage";

function RoleProtectedRoute({ role }: { role: string }) {
    const { user, loading } = useContextAuth();

    if (loading) return <LoadingPage />;

    if (!user) return <Navigate to="/login" replace />;

    if (user.role !== role) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
}

export default RoleProtectedRoute;
