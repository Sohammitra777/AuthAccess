import { useMutation } from "@tanstack/react-query";
import userServices from "../../../../core/services/user.services";
import { useContextAuth } from "../../../../core/auth/auth.hook";

export const useCredentialLoginMutation = () => {
    const { login } = useContextAuth();
    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            await userServices.seedData();
            await login(email, password);
        },
    });
};
