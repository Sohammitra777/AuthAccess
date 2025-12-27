import { Navigate } from "react-router-dom";
import useAuth from "../../../core/auth/auth.hook";

function DashboardPage() {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <main>
            Welcome to the Dashboard
            {user.id}
            <button onClick={logout}>Logout</button>
        </main>
    );
}

export default DashboardPage;
