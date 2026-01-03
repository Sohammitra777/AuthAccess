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
      const userId = user.id;
      logout();
      userServices.deleteUser(userId);
    },
  });
  return (
    <main className="text-mono m-4 flex h-full flex-col items-center text-[#f4f3ee]">
      {user.role === "admin" ? (
        <WelcomeAdminDashboard />
      ) : (
        <WelcomeUserDashboard />
      )}
      <DashboardLinks />
      <button
        className="m-4 mb-0 cursor-pointer rounded-lg border-2 border-red-700 p-2 font-mono text-sm font-bold text-red-700 duration-150 ease-in sm:text-xl"
        onClick={() => mutate()}
      >
        Delete {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </button>
    </main>
  );
}

export default DashboardPage;
