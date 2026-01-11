import axios from "axios";
import axiosConfig from "../api/axios.api";
import type { ApiError } from "./auth.types";

export const authApi = axios.create(axiosConfig.extendedClientConfig("/auth"));
export const baseApi = axios.create(axiosConfig.extendedClientConfig("/auth"));

let refreshPromise: Promise<void> | null = null;
let refreshFailed = false;

authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (!error.response) {
            return Promise.reject<ApiError>({
                success: false,
                status: 0,
                message: "Network error",
            });
        }

        const isAuthRoute =
            error.config.url?.includes("/refresh") ||
            error.config.url?.includes("/login");

        if (
            error.response.status !== 401 ||
            error.config.routeUsed ||
            isAuthRoute ||
            refreshFailed
        ) {
            return Promise.reject(error);
        }

        error.config.routeUsed = true;

        if (!refreshPromise) {
            refreshPromise = baseApi
                .post("/refresh")
                .then(() => {})
                .catch(() => {
                    refreshFailed = true;
                    throw new Error("refresh failed");
                })
                .finally(() => {
                    refreshPromise = null;
                });
        }

        try {
            await refreshPromise;
            return authApi(error.config);
        } catch {
            return Promise.reject(error);
        }
    },
);
