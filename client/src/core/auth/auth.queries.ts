import { useQuery } from "@tanstack/react-query";
import authServices from "./auth.services";

export const useMeQuery = () => {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const data = await authServices.getMe();
            return data.user;
        },
    });
};
