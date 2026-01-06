import useAuth from "../../../core/auth/auth.hook";
import WelcomeUserDashboard from "../components/WelcomeUserDashboard";
import WelcomeAdminDashboard from "../components/WelcomeAdminDashboard";

function DashboardPage() {
    const { user } = useAuth();

    return (
        <main className="text-mono m-4 flex h-full grow flex-col items-center text-[#f4f3ee]">
            {user.role === "admin" ? (
                <WelcomeAdminDashboard />
            ) : (
                <WelcomeUserDashboard />
            )}
        </main>
    );
}

export default DashboardPage;
