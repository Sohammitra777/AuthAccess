import React from "react";
import AuthContext from "../../auth.context";
import { useLoginMutation, useLogoutMutation } from "../../auth.mutations";
import { useMeQuery } from "../../auth.queries";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data, isPending } = useMeQuery();
    const loginMutation = useLoginMutation();
    const logoutMutation = useLogoutMutation();

    const user = data ?? null;
    const loading = isPending;

    const authValue = {
        user,
        loading,
        login: (email: string, password: string) =>
            loginMutation.mutateAsync({ email, password }),
        logout: () => logoutMutation.mutateAsync(),
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;
