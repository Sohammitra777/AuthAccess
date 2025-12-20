import { authApi } from "../core/api/authApi";

type User = {
    id: number;
    email: string;
    role: string;
};

type LoginResponse = {
    token: string;
};

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

    login: async (email: string, password: string): Promise<LoginResponse> => {
        return await authApi.post("/login", {
            email,
            password,
        });
    },

    getMe: async (): Promise<MeResponse> => {
        return await authApi.get("/me");
    },
};

export default authServices;
