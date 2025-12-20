import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "../domain/auth.types";
import AuthContext from "./AuthContext";
import authUtils from "../domain/auth.util";
import authServices from "../../../services/auth.services";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback((token: string) => {
        const user = authUtils.initializeToken(token);
        if (!user) {
            authUtils.removeToken();
            throw new Error("Invalid token");
        }
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        authUtils.removeToken();
        setUser(null);
    }, []);

    const authValue = useMemo(
        () => ({ user, loading, login, logout }),
        [user, loading, login, logout]
    );

    useEffect(() => {
        const bootstrapAuth = async () => {
            const token = authUtils.getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const user = await authServices.getMe();
                setUser(user);
            } catch {
                authUtils.removeToken();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        bootstrapAuth();
    }, []);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
