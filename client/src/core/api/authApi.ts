import axios from "axios";
import axiosConfig from "./axios";

export const authApi = axios.create({
    ...axiosConfig.extendedClientConfig("/auth"),
    withCredentials: true,
});

authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            return Promise.reject({ status: 401 });
        }

        return Promise.reject(
            error.response?.data ?? {
                success: false,
                message: "Network error",
            }
        );
    }
);
