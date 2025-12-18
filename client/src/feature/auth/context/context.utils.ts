import type { JwtPayload, User } from "./context.type";
import { jwtDecode } from "jwt-decode";

const decodedUserFromToken = (token: string): User => {
    const payload = jwtDecode<JwtPayload>(token);

    return {
        userId: payload.userId,
        email: payload.userEmail,
        role: payload.userRole,
    };
};

const contextUtils = {
    loadStoredAuth: () => {
        const token = localStorage.getItem("token");

        if (!token) return null;
        return decodedUserFromToken(token);
    },

    persistAuth: (token: string) => {
        localStorage.setItem("token", token);
    },

    clearAuth: () => {
        localStorage.removeItem("token");
    },

    decodedUserFromToken,
};

export default contextUtils;
