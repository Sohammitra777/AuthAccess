import { email } from "zod";
import authRepo from "./auth.repo";
import authUtils from "./auth.utils";

const authServices = {
    signup: async (email: string, password: string) => {
        const result = await authRepo.checkUserExist(email);

        if (result.length > 0)
            return {
                success: false,
                status: 409,
                message: "User already exist",
            };

        const createdNewUserData = await authRepo.createNewUser(
            email,
            password
        );

        return {
            success: true,
            status: 201,
            message: "signup successful",
            data: createdNewUserData[0],
        };
    },

    login: async (email: string, password: string) => {
        const result = await authRepo.checkUserExist(email);
        const user = result[0];

        if (!user) {
            return {
                success: false,
                status: 400,
                message: "User not registered",
            };
        }

        const verifyPassword = await authUtils.verifyPassword(
            user.hash,
            password
        );

        if (!verifyPassword)
            return {
                success: false,
                status: 400,
                message: "Invalid Password",
            };

        const userToken = authUtils.signinToken(user.id, user.email, user.role);
        return {
            success: true,
            status: 200,
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                token: userToken,
            },
        };
    },

    me: async (email: string) => {
        const result = await authRepo.checkUserExist(email);
        const user = result[0];

        if (!user)
            return {
                success: false,
                status: 404,
                message: "User not found",
            };

        return {
            success: true,
            status: 200,
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    },
};

export default authServices;
