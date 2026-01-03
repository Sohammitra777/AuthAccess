import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "./auth.services";
import type { LoginSchmema } from "./auth.types";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ email, password }: LoginSchmema) => {
            const result = await authServices.login(email, password);
            return result.user;
        },
        onSuccess: (user) => queryClient.setQueryData(["auth", "me"], user),
    });
};

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            queryClient.setQueryData(["auth", "me"], null);
            await authServices.logout();
        },
    });
};
