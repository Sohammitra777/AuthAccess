import { useNavigate } from "react-router-dom";
import useAuth from "../../../core/auth/context/useAuth";

function DashboardPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <main>
            Welcome to the Dashboard
            <button
                onClick={async () => {
                    await logout();
                    navigate("/login");
                }}
            >
                Logout
            </button>
        </main>
    );
}

export default DashboardPage;
