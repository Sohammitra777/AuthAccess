import { useContext } from "react";
import AuthContext from "./auth.context";
import type { AuthContextType, User } from "./auth.types";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export function useAuthRequired() {
    const { user, loading, login, logout } = useAuth();

    if (!user) {
        throw new Error("useAuthRequired used without an authenticated user");
    }

    return {
        user,
        loading,
        login,
        logout,
    } as Omit<AuthContextType, "user"> & { user: User };
}

export default useAuth;
