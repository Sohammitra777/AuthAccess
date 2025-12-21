import { authApi } from "../core/api/authApi";

type User = {
    id: number;
    email: string;
    role: string;
};

export interface MeApiResponse {
    success: boolean;
    user?: User;
    message?: string;
}

type SignupResponse = User;
type MeResponse = User;

const authServices = {
    signup: async (
        email: string,
        password: string
    ): Promise<SignupResponse> => {
        return await authApi.post("/signup", {
            email,
            password,
        });
    },

    login: async (email: string, password: string): Promise<User> => {
        return await authApi.post("/login", {
            email,
            password,
        });
    },

    getMe: async (): Promise<MeResponse> => {
        const res = await authApi.get<MeApiResponse>("/me");

        if (!res.data.success || !res.data.user) {
            throw res;
        }

        return res.data.user;
    },

    logout: async () => {
        return await authApi.post("/logout");
    },
};

export default authServices;
