import { useMutation } from "@tanstack/react-query";
import userServices from "../../../core/services/user.services";
import useAuth, { useAuthRequired } from "../../../core/auth/auth.hook";
import DashboardLinks from "../components/DashboardLinks";
import WelcomeUserDashboard from "../components/WelcomeUserDashboard";
import WelcomeAdminDashboard from "../components/WelcomeAdminDashboard";

function DashboardPage() {
    const { logout } = useAuth();
    const { user } = useAuthRequired();

    const { mutate } = useMutation({
        mutationFn: async () => {
            logout();
            userServices.deleteUser(user.id);
        },
    });
    return (
        <main className="h-full m-4 text-[#f4f3ee] text-mono flex flex-col items-center">
            {user.role === "admin" ? (
                <WelcomeAdminDashboard />
            ) : (
                <WelcomeUserDashboard />
            )}
            <DashboardLinks />
            <button
                className="mb-0 m-4 p-2 font-mono font-bold border-2 border-red-700 
                text-red-700 text-xl rounded-lg cursor-pointer duration-150 ease-in"
                onClick={() => mutate()}
            >
                Delete {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </button>
        </main>
    );
}

export default DashboardPage;
