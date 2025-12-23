import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "../domain/auth.types";
import AuthContext from "./AuthContext";
import authServices from "../../../services/auth.services";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback(async (email: string, password: string) => {
        const data = await authServices.login(email, password);
        console.log(data.user);
        setUser(data.user);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authServices.logout();
            setUser(null);
        } catch (error) {
            setUser(null);
        }
    }, []);

    const authValue = useMemo(
        () => ({ user, loading, login, logout }),
        [user, loading, login, logout]
    );

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                const data = await authServices.getMe();
                setUser(data.user);
            } catch {
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
