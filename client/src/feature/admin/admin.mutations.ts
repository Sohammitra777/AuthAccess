import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminServices from "../../core/services/admin.services";
import userServices from "../../core/services/user.services";

type User = {
    id: string;
    email: string;
    role: string;
};

export const useAdminDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => adminServices.deleteUser(id),
        onMutate: (id: string) => {
            const previousData = queryClient.getQueryData(["admin", "users"]);

            queryClient.setQueryData<User[]>(["admin", "users"], (old) =>
                old ? old.filter((u) => u.id !== id) : old,
            );

            return { previousData };
        },
        onError: (_err, _id, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    ["admin", "users"],
                    context.previousData,
                );
            }
        },
        onSettled: () => {
            queryClient.refetchQueries({ queryKey: ["admin", "users"] });
        },
    });
};

export const useAdminSeedData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await userServices.seedData();
        },
        onSettled: () =>
            queryClient.refetchQueries({ queryKey: ["admin", "users"] }),
    });
};
