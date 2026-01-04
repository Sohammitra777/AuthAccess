import { useContext } from "react";
import AuthContext from "./auth.context";
import type { User, AuthContextType } from "./auth.types";

export const useContextAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

const useAuth = () => {
    const { user, loading, login, logout } = useContextAuth();

    if (!user) throw new Error("useAuth must be used inside protected routes");

    const value: Omit<AuthContextType, "user"> & { user: User } = {
        user,
        loading,
        login,
        logout,
    };
    return value;
};

export default useAuth;
