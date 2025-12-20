import axios from "axios";
import axiosConfig from "./axios";
import authUtils from "../auth/domain/auth.util";

export const authApi = axios.create(axiosConfig.extendedClientConfig("/auth"));

authApi.interceptors.request.use((config) => {
    const token = authUtils.getToken();

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

authApi.interceptors.response.use(
    (response) => {
        const { success, user } = response.data;

        if (!success) {
            return Promise.reject(response.data);
        }

        if (!user) {
            return Promise.reject({
                success: false,
                message: "Auth API contract voilated: user missing",
            });
        }

        return user;
    },
    (error) => {
        if (error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject({
            success: false,
            message: "Network error",
        });
    }
);
