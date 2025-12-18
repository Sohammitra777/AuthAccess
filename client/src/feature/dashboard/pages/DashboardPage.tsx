import { useEffect } from "react";
import { useAuth } from "../../auth/context/component/AuthContext";

function DashboardPage() {
    const { user } = useAuth();

    useEffect(() => {
        localStorage.setItem("name", "soham");
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default DashboardPage;
