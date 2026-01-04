import { useMutation } from "@tanstack/react-query";
import userServices from "../core/services/user.services";

export const useDeleteMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => userServices.deleteUser(id),
    });
};
