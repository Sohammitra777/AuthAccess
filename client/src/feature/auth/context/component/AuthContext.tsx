import React, { createContext, useContext, useEffect, useState } from "react";
import contextUtils from "../context.utils";
import type { AuthContextType, User } from "../context.type";

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = contextUtils.loadStoredAuth();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login: (token: string) => {
                    contextUtils.persistAuth(token);
                    setUser(contextUtils.decodedUserFromToken(token));
                },
                logout: () => {
                    contextUtils.clearAuth();
                    setUser(null);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("userAuth must be inside AuthProvider");
    return ctx;
};

export { useAuth };
export default AuthProvider;
