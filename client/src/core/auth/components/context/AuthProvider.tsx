import React, { useCallback, useMemo } from "react";
import AuthContext from "../../auth.context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authServices from "../../auth.services";
function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();
    const { data, isPending } = useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const data = await authServices.getMe();
            return data.user;
        },
        retry: false,
    });
    const user = data ?? null;
    const loading = isPending;
    const login = useCallback(
        async (email: string, password: string) => {
            const data = await authServices.login(email, password);
            queryClient.setQueryData(["auth", "me"], data.user);
        },
        [queryClient]
    );
    const logout = useCallback(async () => {
        try {
            await authServices.logout();
        } finally {
            queryClient.setQueryData(["auth", "me"], null);
        }
    }, [queryClient]);
    const authValue = useMemo(
        () => ({ user, loading, login, logout }),
        [user, loading, login, logout]
    );
    return (
        <AuthContext.Provider value={authValue}>
            {" "}
            {children}{" "}
        </AuthContext.Provider>
    );
}
export default AuthProvider;
