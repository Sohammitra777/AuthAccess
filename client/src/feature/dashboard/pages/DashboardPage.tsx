import useAuth from "../../../core/auth/context/useAuth";

function DashboardPage() {
    const { logout } = useAuth();
    return (
        <main>
            Welcome to the Dashboard
            <button onClick={() => logout()}>Logout</button>
        </main>
    );
}

export default DashboardPage;
