import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../auth.hook";

function RoleProtectedRoute({ role }: { role: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
