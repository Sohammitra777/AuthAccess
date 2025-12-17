import { success } from "zod";
import adminRepo from "./admin.repo";
import { User } from "./admin.type";

const adminServices = {
    getUsers: async () => {
        const repoResult = await adminRepo.getUsers();

        if (repoResult.length === 0)
            return {
                success: true,
                status: 200,
                message: "No user exist",
                data: repoResult,
            };

        return {
            success: true,
            status: 200,
            message: "User array",
            data: repoResult,
        };
    },

    createUser: async (adminUser: User) => {
        const findByEmailResult = await adminRepo.findByEmail(adminUser.email);

        if (findByEmailResult.length > 0)
            return {
                success: false,
                status: 409,
                message: "User already exists",
                data: findByEmailResult[0],
            };

        const createUserResult = await adminRepo.createUser(adminUser);
        return {
            success: true,
            status: 201,
            message: "User created",
            data: createUserResult[0],
        };
    },
};

export default adminServices;
