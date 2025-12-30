import { useContext } from "react";
import AuthContext from "./auth.context";
import type { User } from "./auth.types";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export function useAuthRequired() {
    const { user, ...rest } = useAuth();

    if (!user) {
        throw new Error("useAuthRequired used without an authenticated user");
    }

    return {
        user,
        ...rest,
    } as {
        user: User;
    };
}

export default useAuth;
