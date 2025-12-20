import { jwtDecode } from "jwt-decode";
import type { JwtPayload, User } from "./auth.types";

const decodedUserFromToken = (): User | null => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const payload = jwtDecode<JwtPayload>(token);

        if (!payload.exp || payload.exp * 1000 < Date.now()) {
            return null;
        }

        return {
            id: payload.userId,
            email: payload.userEmail,
            role: payload.userRole,
        };
    } catch {
        return null;
    }
};

const authUtils = {
    getToken: (): string | null => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token does not exist");
            return token;
        } catch (error) {
            return null;
        }
    },
    initializeToken: (token: string) => {
        localStorage.setItem("token", token);
        return decodedUserFromToken();
    },

    removeToken: () => {
        localStorage.removeItem("token");
    },

    decodedUserFromToken,
};

export default authUtils;
