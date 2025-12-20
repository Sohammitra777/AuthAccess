import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "../domain/auth.types";
import contextUtils from "../domain/auth.util";
import AuthContext from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback((token: string) => {
        const user = contextUtils.initializeToken(token);
        if (!user) {
            contextUtils.removeToken();
            throw new Error("Invalid token");
        }
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        contextUtils.removeToken();
        setUser(null);
    }, []);

    const authValue = useMemo(
        () => ({ user, loading, login, logout }),
        [user, loading, login, logout]
    );

    useEffect(() => {
        const user: User | null = contextUtils.decodedUserFromToken();

        if (user) {
            setUser(user);
        } else {
            contextUtils.removeToken();
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
