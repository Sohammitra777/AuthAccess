import { authApi } from "../core/api/authApi";

type ApiSuccess = {
    success: true;
    message: string;
    user: {
        id: number;
        email: string;
        role: string;
    };
};

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
        const {} = result.data
        return result.data;
    },

    logout: async () => {
        return await authApi.post("/logout");
    },
};

export default authServices;
