import useAuth from "../../../core/auth/auth.hook";
import DashboardLinks from "../components/DashboardLinks";
import WelcomeUserDashboard from "../components/WelcomeUserDashboard";
import WelcomeAdminDashboard from "../components/WelcomeAdminDashboard";

function DashboardPage() {
    const { user } = useAuth();

    return (
        <main className="text-mono m-4 flex h-full flex-col items-center text-[#f4f3ee]">
            {user.role === "admin" ? (
                <WelcomeAdminDashboard />
            ) : (
                <WelcomeUserDashboard />
            )}
            <DashboardLinks />
        </main>
    );
}

export default DashboardPage;
