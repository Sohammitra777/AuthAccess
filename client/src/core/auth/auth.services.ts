import { authApi } from "./auth.api";
import type { ApiSuccess } from "./auth.types";

const authServices = {
    signup: async (email: string, password: string): Promise<ApiSuccess> => {
        const result = await authApi.post<ApiSuccess>("/signup", {
            email,
            password,
        });

        return result.data;
    },

    login: async (email: string, password: string): Promise<ApiSuccess> => {
        const result = await authApi.post<ApiSuccess>("/login", {
            email,
            password,
        });

        return result.data;
    },

    getMe: async (): Promise<ApiSuccess> => {
        const result = await authApi.get<ApiSuccess>("/me");
        const {} = result.data;
        return result.data;
    },

    logout: async () => {
        await authApi.post("/logout");
    },
};

export default authServices;
